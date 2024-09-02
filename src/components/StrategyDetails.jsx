import React from 'react';
import { useNavigate } from 'react-router-dom';

const StrategyDetails = () => {
  const navigate = useNavigate();

  const handleBacktestClick = () => {
    navigate('/backtest-page');
  };

  const handleTryNowClick = () => {
    navigate('/credentials'); // Navigate to the credentials page
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">What is Short-Term EMA Reversal?</h1>
      <img
        src="/Short-Term EMA Reversal.jpg"
        alt="Short-Term EMA Reversal"
        className="spacing-between-heading-image original-size"
      />
      <p>
        At its heart, the Short-Term EMA Reversal scalping strategy leverages a technical indicator called the Exponential Moving Average (EMA) to identify short-term trading opportunities. The strategy focuses on capturing quick price reversals that occur when the price deviates from the EMA.
      </p>
      <p>
        Imagine the EMA (blue line) as a dynamic line that evolves with the price, capturing the trend’s heartbeat at any given moment. It’s exceptionally responsive to recent price changes, making it a perfect tool for short-term traders aiming to catch quick reversals. The strategy aims to profit from short-selling opportunities that arise when the price fails to sustain its upward momentum.
      </p>
      <p>
        The Short-Term EMA Reversal scalping strategy is a reversal strategy based on the logic that the price has to return to its mean. Here, EMA is considered the mean point of the price. Thus, in the Short-Term EMA Reversal strategy, we look for reversals when the price moves away from its mean. This strategy capitalizes on situations where the price seems to be losing momentum in an uptrend. We will look for specific price action signals near the EMA to initiate short trades, aiming to profit if the price continues its downward journey.
      </p>
      <h2 className="bold-heading">Spotting Your Entry: The Qualifying Candle</h2>
      <p>
        Our strategy hinges on a specific type of price action, which we refer to as the qualifying candle. Here’s how to identify it:
      </p>
      <ul className="numbered-list">
        <li><strong>Price Position:</strong> The closing price of the candle must be above the EMA, and the candle's low must also be above the EMA.</li>
        <li><strong>Non-Touching High/Low:</strong> The candle should have a high that doesn't touch the EMA, indicating a strong trend.</li>
      </ul>
      <img
        src="/imge1.jpg"
        alt="Strategy Illustration"
        className="image-spacing equal-size"
      />
      <p>
        In the image above, you can see that the highlighted candle closed above the blue line and the candle's low is also above the blue line (EMA of length 5), making it a qualifying candle.
      </p>
      <h2 className="bold-heading">Ready, Set, Short!</h2>
      <p>
        Once you identify a qualifying candle, it's time to prepare for a short trade. The next candle should be your entry point if it breaks the low of the qualifying candle.
      </p>
      <img
        src="/imge2.jpg"
        alt="Entry Signal"
        className="image-spacing equal-size"
      />
      <p>
        In the above image, you will see the green arrow-marked candle as our entry candle, which took entry when the low of the qualifying candle was crossed.
      </p>
      <h2 className="bold-heading">Why Short Here?</h2>
      <p>
        The breakdown below the qualifying candle's low implies that the uptrend might be losing steam. By entering a short trade here, you're essentially betting that the price will continue its downward trajectory.
      </p>
      <p>
        The breakdown below the qualifying candle's low implies that the uptrend might be losing steam. By entering a short trade here, you're essentially betting that the price will continue its downward trajectory.
      </p>
      <img
        src="/imge3.jpg"
        alt="Exit Signal"
        className="image-spacing equal-size"
      />
      <p>
        No trading strategy is complete without a solid risk management plan. Here's how the Short-Term EMA Reversal scalping strategy incorporates stop-loss and take-profit orders:
      </p>
      <ul className="numbered-list">
        <li><strong>Stop-Loss:</strong> To limit potential losses, place a stop-loss order above the high of the qualifying candle. This ensures you exit the trade if the price unexpectedly surges higher, invalidating your short thesis.</li>
        <img
          src="/imge4.jpg"
          alt="Stop-Loss and Take-Profit"
          className="image-spacing"
          style={{ width: '100%', height: 'auto', maxWidth: '600px' }} // Adjust size as needed
        />
        <li><strong>Take-Profit:</strong> Aim for a minimum 1:3 risk-to-reward ratio. This means your take-profit target should ideally be three times the distance between your entry point and stop-loss.</li>
      </ul>
      <h2 className="bold-heading">Essential Strategy Settings</h2>
      <p>Here are some essential settings used in developing the algorithm:</p>
      <ul className="numbered-list mb-4">
        <li>
          <strong>EMA Settings:</strong>
          <ul className="list-disc pl-6 mb-4">
            <li>Length: 5</li>
            <li>Source: Close</li>
            <li>Offset: 0</li>
            <li>Smoothing Line: EMA</li>
            <li>Smoothing Length: 9</li>
          </ul>
          <img
            src="/emasetting.jpg"
            alt="EMA Settings"
            className="image-spacing equal-size mb-4"
          />
        </li>
        <li>
          <strong>Timeframe Usage:</strong>
          <ul className="list-disc pl-6 mb-4">
            <li>Sell Side: 5-minute candlestick timeframe for faster downside trends.</li>
            <li>Buy Side: 15-minute candlestick timeframe for longer trends.</li>
          </ul>
          <p className="mb-4">
            Simple logic: Sell side trends are faster and need to be captured immediately (since the long-term trend is always bullish). Buy side trends generally persist for a longer time duration, so using a longer timeframe allows you to ride big trends with a low stop loss.
          </p>
        </li>
      </ul>
      <button onClick={handleBacktestClick} className="btn btn-primary mt-4">
        Backtest Results
      </button>
      <button onClick={handleTryNowClick} className="btn btn-secondary mt-4">
        Try Now
      </button>
    </div>
  );
};

export default StrategyDetails;
