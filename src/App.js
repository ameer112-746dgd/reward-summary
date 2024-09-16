import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import RewardsSummary from './components/RewardsSummary';
import CashbackPage from './components/CashbackPage/page';
import CashOutPage from './components/CashOutPage/page';

function App() {
  const [cashbackAmount, setCashbackAmount] = useState(0);
  const [bookings] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the hamburger menu

  const handleCashbackClaimed = (amount) => {
    setCashbackAmount(amount);
  };

  const handleBookingMade = (cashback) => {
    setCashbackAmount(prevAmount => prevAmount + cashback);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Rewards Summary</h1>
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
            <div className={`bar ${menuOpen ? 'open' : ''}`}></div>
          </div>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={toggleMenu}>Rewards Summary</Link> 
            <Link to="/cashback" onClick={toggleMenu}>Cashback</Link> 
            <Link to="/cashout" onClick={toggleMenu}>Cash Out</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RewardsSummary onBookingMade={handleBookingMade} />} />
            <Route path="/cashback" element={<CashbackPage onCashbackClaimed={handleCashbackClaimed} />} />
            <Route path="/cashout" element={<CashOutPage cashbackAmount={cashbackAmount} bookings={bookings} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
