from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import pandas as pd
from fyers_apiv3 import fyersModel
from fyers_apiv3.FyersWebsocket import data_ws
import time
import os
import threading
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173", async_mode='threading')

# Load credentials from access_token.txt
def load_credentials():
    file_path = os.path.join(os.path.dirname(__file__), 'access_token.txt')
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"The credentials file '{file_path}' does not exist.")

    credentials = {}
    try:
        with open(file_path, 'r') as file:
            for line in file:
                key, value = line.strip().split(':', 1)
                credentials[key] = value
    except Exception as e:
        raise RuntimeError(f"An error occurred while loading credentials: {e}")

    return credentials

credentials = load_credentials()
client_id = credentials.get("client_id")
secret_key = credentials.get("secret_key")
redirect_uri = credentials.get("redirect_uri")
token = credentials.get("access_token")

# Initialize FyersModel instance
fyers = fyersModel.FyersModel(client_id=client_id, is_async=False, token=token, log_path="")

# Strategy Variables
buypos, sellpos, stoploss, entry, bflag, sflag, spos, bpos, exit, target, gain = 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
cstrike, pstrike, expiry, sym = '', '', 'NSE:BANKNIFTY24904', 'NSE:NIFTYBANK-INDEX'
fmflag, fimflag = 0, 0
row = -2
emadata5 = pd.DataFrame()
emadata15 = pd.DataFrame()
date_from = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
date_to = datetime.now().strftime('%Y-%m-%d')

# Get EMA data
def getdata(sym, res, rfrom, rto):
    global emadata5, emadata15
    cdata = {
        "symbol": sym,
        "resolution": str(res),
        "date_format": "1",
        "range_from": rfrom,
        "range_to": rto,
        "cont_flag": "0"
    }
    try:
        response = fyers.history(data=cdata)
        if 'candles' not in response:
            socketio.emit('strategy_update', {'message': f"Error fetching data: {response}"})
            return
        
        data = pd.DataFrame.from_dict(response['candles'])
        cols = ['datetime', 'open', 'high', 'low', 'close', 'volume']
        data.columns = cols
        data['datetime'] = pd.to_datetime(data['datetime'], unit="s")
        data['datetime'] = data['datetime'].dt.tz_localize('utc').dt.tz_convert('Asia/Kolkata')
        data['datetime'] = data['datetime'].dt.tz_localize(None)
        data = data.set_index('datetime')
        data['ema'] = data['close'].ewm(span=5 if res == 5 else 15, min_periods=5).mean()
        if res == 5:
            emadata5 = data
        if res == 15:
            emadata15 = data
        socketio.emit('strategy_update', {'message': f"EMA data updated for {res} minutes"})
    except Exception as e:
        socketio.emit('strategy_update', {'message': f"Error fetching EMA data: {str(e)}"})

# Strategy logic for buy/sell orders based on EMA data
def onmessage(message):
    global buypos, sellpos, stoploss, exit, pstrike, cstrike, target, bflag, sflag, fmflag, fimflag, bpos, spos, gain, entry
    t = time.localtime()
    cmin = time.strftime("%M", t)
    csec = time.strftime("%S", t)

    # Update EMA data every 5 and 15 minutes
    if int(cmin) % 5 == 0 and int(csec) >= 1 and fmflag == 0:
        getdata(sym, 5, date_from, date_to)
        fmflag = 1
        if spos == 0:
            sflag = 0
    if int(cmin) % 5 != 0 and fmflag == 1:
        fmflag = 0
    if int(cmin) % 15 == 0 and int(csec) >= 1 and fimflag == 0:
        getdata(sym, 15, date_from, date_to)
        fimflag = 1
        if bpos == 0:
            bflag = 0
    if int(cmin) % 15 != 0 and fimflag == 1:
        fimflag = 0

    # Strategy logic to place orders
    if 'ltp' not in message:
        socketio.emit('strategy_update', {'message': f"Error: 'ltp' not in message: {message}"})
        return

    ltp = message['ltp']
    socketio.emit('strategy_update', {'message': f"LTP: {ltp}, Gain: {gain}"})

    # Implement your strategy logic here
    # For example:
    if emadata5.empty or emadata15.empty:
        return  # Skip if EMA data is not yet available

    if (emadata5['close'].iloc[row] > emadata5['ema'].iloc[row] and
        ltp < emadata5['low'].iloc[row] and
        spos == 0 and sflag == 0):
        # Sell signal
        spos = sflag = 1
        entry = ltp
        stoploss = emadata5['high'].iloc[row]
        target = ltp - (emadata5['high'].iloc[row] - emadata5['low'].iloc[row]) * 3
        pstrike = f"{expiry}{int(round(ltp, -2))}PE"
        socketio.emit('strategy_update', {'message': f"Sell signal: {pstrike}"})
        # Implement order placement logic here

    elif (emadata15['close'].iloc[row] < emadata15['ema'].iloc[row] and
          ltp > emadata15['high'].iloc[row] and
          bpos == 0 and bflag == 0):
        # Buy signal
        bpos = bflag = 1
        entry = ltp
        stoploss = emadata15['low'].iloc[row]
        target = ltp + (emadata15['high'].iloc[row] - emadata15['low'].iloc[row]) * 3
        cstrike = f"{expiry}{int(round(ltp, -2))}CE"
        socketio.emit('strategy_update', {'message': f"Buy signal: {cstrike}"})
        # Implement order placement logic here

    # Implement exit conditions
    if spos == 1 and ltp > stoploss:
        gain += entry - stoploss
        spos = 0
        socketio.emit('strategy_update', {'message': f"Sell position closed: {pstrike}, Gain: {gain}"})
        # Implement order closing logic here

    if bpos == 1 and ltp < stoploss:
        gain += stoploss - entry
        bpos = 0
        socketio.emit('strategy_update', {'message': f"Buy position closed: {cstrike}, Gain: {gain}"})
        # Implement order closing logic here

# WebSocket Connection
def onerror(message):
    socketio.emit('strategy_update', {'message': f"Error: {message}"})

def onclose(message):
    socketio.emit('strategy_update', {'message': f"Connection closed: {message}"})

def onopen():
    data_type = "SymbolUpdate"
    symbols = [sym]
    fyersdata.subscribe(symbols=symbols, data_type=data_type)
    fyersdata.keep_running()

# Create WebSocket instance
fyersdata = data_ws.FyersDataSocket(
    access_token=f"{client_id}:{token}",
    log_path="",
    litemode=True,
    write_to_file=False,
    reconnect=True,
    on_connect=onopen,
    on_close=onclose,
    on_error=onerror,
    on_message=onmessage
)

def run_strategy():
    try:
        fyersdata.connect()
    except Exception as e:
        socketio.emit('strategy_update', {'message': f"Error connecting to WebSocket: {str(e)}"})

@app.route('/api/execute-strategy', methods=['GET'])
def execute_strategy():
    threading.Thread(target=run_strategy).start()
    return jsonify({"success": True, "message": "Strategy execution started"})

if __name__ == "__main__":
    socketio.run(app, host='127.0.0.1', port=5001, debug=True)