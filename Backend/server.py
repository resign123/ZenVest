from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import hmac
import struct
import time
import requests
from urllib.parse import urlparse, parse_qs
from fyers_apiv3 import fyersModel
import os

app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "*"}})

def totp(key, time_step=30, digits=6, digest="sha1"):
    key = base64.b32decode(key.upper() + "=" * ((8 - len(key)) % 8))
    counter = struct.pack(">Q", int(time.time() / time_step))
    mac = hmac.new(key, counter, digest).digest()
    offset = mac[-1] & 0x0F
    binary = struct.unpack(">L", mac[offset : offset + 4])[0] & 0x7FFFFFFF
    return str(binary)[-digits:].zfill(digits)

def save_credentials_to_file(credentials):
    file_path = os.path.join(os.path.dirname(__file__), "access_token.txt")
    with open(file_path, "w") as file:
        for key, value in credentials.items():
            file.write(f"{key}:{value}\n")

def get_token(username, totp_key, pin, client_id, secret_key, redirect_uri):
    headers = {
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent": "Mozilla/5.0",
    }

    s = requests.Session()
    s.headers.update(headers)

    data1 = f'{{"fy_id":"{base64.b64encode(f"{username}".encode()).decode()}","app_id":"2"}}'
    r1 = s.post("https://api-t2.fyers.in/vagator/v2/send_login_otp_v2", data=data1)

    request_key = r1.json().get("request_key", "")
    if not request_key:
        return {"success": False, "error": "Failed to send OTP"}

    data2 = f'{{"request_key":"{request_key}","otp":{totp(totp_key)}}}'
    r2 = s.post("https://api-t2.fyers.in/vagator/v2/verify_otp", data=data2)
    if r2.status_code != 200:
        return {"success": False, "error": "OTP verification failed"}

    request_key = r2.json().get("request_key", "")
    data3 = f'{{"request_key":"{request_key}","identity_type":"pin","identifier":"{base64.b64encode(f"{pin}".encode()).decode()}"}}'
    r3 = s.post("https://api-t2.fyers.in/vagator/v2/verify_pin_v2", data=data3)
    if r3.status_code != 200:
        return {"success": False, "error": "PIN verification failed"}

    headers = {"authorization": f"Bearer {r3.json()['data']['access_token']}", "content-type": "application/json; charset=UTF-8"}
    data4 = f'{{"fyers_id":"{username}","app_id":"{client_id[:-4]}","redirect_uri":"{redirect_uri}","appType":"100","code_challenge":"","state":"abcdefg","scope":"","nonce":"","response_type":"code","create_cookie":true}}'
    r4 = s.post("https://api.fyers.in/api/v2/token", headers=headers, data=data4)
    if r4.status_code != 308:
        return {"success": False, "error": "Failed to retrieve auth code"}

    parsed = urlparse(r4.json()["Url"])
    auth_code = parse_qs(parsed.query).get("auth_code", [""])[0]
    if not auth_code:
        return {"success": False, "error": "Failed to retrieve auth code"}

    session = fyersModel.SessionModel(client_id=client_id, secret_key=secret_key, redirect_uri=redirect_uri, response_type="code", grant_type="authorization_code")
    session.set_token(auth_code)
    response = session.generate_token()
    token = response.get("access_token", "")
    
    if not token:
        return {"success": False, "error": "Failed to generate token"}

    # Save credentials to file
    credentials = {
        "username": username,
        "totp_key": totp_key,
        "pin": pin,
        "client_id": client_id,
        "secret_key": secret_key,
        "access_token": token
    }
    save_credentials_to_file(credentials)

    return {"success": True, "token": token, "message": "Login successful"}

@app.route('/api/generate-token', methods=['POST'])
def generate_token():
    data = request.json
    username = data.get("username")
    totp_key = data.get("totpKey")
    pin = data.get("pin")
    client_id = data.get("clientId")
    secret_key = data.get("secretKey")
    redirect_uri = "https://www.google.com/"

    if not all([username, totp_key, pin, client_id, secret_key]):
        return jsonify({"success": False, "error": "Missing required parameters"})

    result = get_token(username, totp_key, pin, client_id, secret_key, redirect_uri)
    if result["success"]:
        return jsonify(result), 200
    else:
        return jsonify(result), 400

@app.route('/api/get-credentials', methods=['GET'])
def get_credentials():
    # Read credentials from the file
    file_path = os.path.join(os.path.dirname(__file__), "access_token.txt")
    credentials = {}
    try:
        with open(file_path, 'r') as file:
            for line in file:
                key, value = line.strip().split(":", 1)
                credentials[key] = value
    except FileNotFoundError:
        return jsonify({"success": False, "error": "Credentials file not found"}), 404

    return jsonify(credentials), 200

# if __name__ == "__main__":
#     app.run(host='127.0.0.1', port=5000, debug=True)
