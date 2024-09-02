import React from 'react';

const BacktestPage = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Backtest Results</h1>
      <p className="mb-4">
        Here are the important backtesting metrices of the Short-Term EMA Reversal Strategy:
      </p>
      <img
        src="/Short-Term EMA Reversal Backtest.jpg"
        alt="Backtest"
        className="mb-4"
        style={{ width: '100%' }} // Ensure the image covers the full width
      />
    </div>
  );
};

export default BacktestPage;
