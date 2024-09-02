import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const StrategyPage = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('strategy_update', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const executeStrategy = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/execute-strategy');
      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.message]);
    } catch (error) {
      console.error('Error executing strategy:', error);
      setMessages((prevMessages) => [...prevMessages, 'Error executing strategy']);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Strategy Execution</h1>
      <div className="mb-4">
        <button 
          onClick={executeStrategy}
          className="btn btn-primary mt-4"
        >
          Execute Strategy
        </button>
        <span className="ml-4">
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Strategy Updates:</h2>
        <ul className="bg-gray-100 p-4 rounded-lg h-96 overflow-y-auto">
          {messages.map((message, index) => (
            <li key={index} className="mb-2">{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StrategyPage;