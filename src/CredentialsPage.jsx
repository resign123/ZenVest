import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CredentialsPage = () => {
  const [totpKey, setTotpKey] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [clientId, setClientId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!totpKey || !username || !pin || !clientId || !secretKey) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const API_URL = 'https://invest-cxy29lj1t-shivams-projects-747fd955.vercel.app/';
      const response = await axios.post(`${API_URL}/api/generate-token`, {
        totpKey,
        username,
        pin,
        clientId,
        secretKey,
      });

      if (response.data.success) {
        setMessage(response.data.message || 'Login successful!');
        navigate('/strategy');
      } else {
        setMessage(response.data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.error || 'Unknown server error'}`);
      } else if (error.request) {
        setMessage('No response received from server. Please try again.');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Enter Credentials</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label htmlFor="totpKey" className="block text-sm font-medium text-gray-700">TOTP Key</label>
          <input
            type="text"
            id="totpKey"
            value={totpKey}
            onChange={(e) => setTotpKey(e.target.value)}
            placeholder='xxxxxxxxxxxxxx'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='xxxxxxxxxxxxxx'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN</label>
          <input
            type="number"
            id="pin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder='xxxx'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">Client ID</label>
          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder='xxxxxxxxxxxxxx'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <div className="form-group">
          <label htmlFor="secretKey" className="block text-sm font-medium text-gray-700">Secret Key</label>
          <input
            type="text"
            id="secretKey"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder='xxxxxxxxxxxxxx'
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
        >
          Submit
        </button>
      </form>
      {message && <div className="mt-4 text-lg font-semibold">{message}</div>}
    </div>
  );
};

export default CredentialsPage;
