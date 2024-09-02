import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Process from './components/Process';
import Achievement from './components/Achievement';
import Footer from './components/Footer';
import StrategyDetails from './components/StrategyDetails';
import CredentialsPage from './CredentialsPage'; // Import CredentialsPage
import BacktestPage from './components/BacktestPage';
import TradingStrategies from './components/TradingStrategies';
import StrategyPage from './components/StrategyPage'; // Import the new StrategyPage component

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Process />
            <Achievement />
          </>
        } />
        <Route path="/strategies" element={<TradingStrategies />} />
        <Route path="/strategy/short-term-ema-reversal" element={<StrategyDetails />} />
        <Route path="/credentials" element={<CredentialsPage />} /> {/* Add CredentialsPage route */}
        <Route path="/strategy" element={<StrategyPage />} /> {/* Add StrategyPage route */}
        <Route path="/backtest-page" element={<BacktestPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
