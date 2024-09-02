import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import trade from "../../public/trade.jpg";

export default function Banner() {
  const navigate = useNavigate();
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  const onGetStarted = () => {
    navigate('/strategies');
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-5">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-24">
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold">
              <span className="text-black">ZenVest:</span>{' '}
              <span className="text-purple-500">Discover Effortless Investing Everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              Discover effortless investing with <strong>ZenVest</strong>! Our automated investment model offers a stress-free experience. Say goodbye to complex processes – just a single click and you're on your way to a smarter financial future. With our backtested strategy, enjoy peace of mind while your investments work for you, effortlessly.
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
          <div className="mt-6 flex items-center space-x-4">
            <div
              className={`flex items-center text-green-500 font-bold ${
                isBlinking ? 'opacity-100' : 'opacity-50'
              } transition-opacity duration-300 ease-in-out`}
            >
              <span
                className={`mr-2 ${isBlinking ? 'text-pink-500' : 'text-green-500'}`}
              >
                Click Here
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${isBlinking ? 'animate-bounce' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
            <button
              className="btn btn-primary text-xl font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105"
              onClick={onGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2 flex justify-center items-center">
          <img
            src={trade}
            className="original-size rounded-xl"
            alt="Trading illustration"
            style={{ marginLeft: '4rem' }}
          />
        </div>
      </div>
    </div>
  );
}
