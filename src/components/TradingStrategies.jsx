import React from 'react';
import { useNavigate } from 'react-router-dom';

const TradingStrategies = () => {
  const navigate = useNavigate();

  const handleStrategyClick = (strategy) => {
    // Navigate to the strategy details page based on the strategy name
    navigate(`/strategy/${strategy.toLowerCase().replace(/ /g, '-')}`);
  };

  const strategies = [
    'Short-Term EMA Reversal',
    'Moving Average Crossover',
    'Relative Strength Index (RSI)',
    'Bollinger Bands',
    'MACD (Moving Average Convergence Divergence)',
    'Fibonacci Retracement',
    'Inside Candle',
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Trading Strategies</h1>
      <ul className="list-disc pl-5">
        {strategies.map((strategy, index) => (
          <li
            key={index}
            className="mb-2 cursor-pointer text-gray-700 hover:text-blue-500 hover:underline"
            onClick={() => handleStrategyClick(strategy)}
          >
            {strategy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradingStrategies;
