import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CashOutPage.css';

const CashOutPage = ({ cashbackAmount, bookings }) => {
  const [earnings, setEarnings] = useState({ balance: cashbackAmount, currency: 'USD' });
  const [cashOutHistory, setCashOutHistory] = useState([]);
  const [cashOutStatus, setCashOutStatus] = useState('');

  useEffect(() => {
    const storedEarnings = JSON.parse(localStorage.getItem('earnings'));
    const storedCashOutHistory = JSON.parse(localStorage.getItem('cashOutHistory'));
    if (storedEarnings) setEarnings(storedEarnings);
    if (storedCashOutHistory) setCashOutHistory(storedCashOutHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('earnings', JSON.stringify(earnings));
    localStorage.setItem('cashOutHistory', JSON.stringify(cashOutHistory));
  }, [earnings, cashOutHistory]);

  const handleCashOut = () => {
    if (earnings.balance > 0) {
      setCashOutStatus('Processing Cash Out...');
      setTimeout(() => {
        const newHistory = [
          ...cashOutHistory,
          {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            amount: earnings.balance,
            description: 'Cash Out',
          },
        ];
        setCashOutHistory(newHistory);
        setEarnings({ ...earnings, balance: 0 }); // Set balance to 0 after cash out
        setCashOutStatus('Cash Out Successful!');
      }, 1500);
    } else {
      setCashOutStatus('No balance to cash out.');
    }
  };

  const handleDeleteCashOut = (id) => {
    const updatedHistory = cashOutHistory.filter((entry) => entry.id !== id);
    setCashOutHistory(updatedHistory);
  };

  return (
    <motion.div className="cash-out-page container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="heading">Cash Out</h2>

      <motion.div className="cash-out-section" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
        <p className={`status-message ${cashOutStatus.includes('Successful') ? 'success' : 'processing'}`}>
          {cashOutStatus}
        </p>
        <motion.button className="button" onClick={handleCashOut} disabled={earnings.balance <= 0}>
          Cash Out ${earnings.balance.toFixed(2)}
        </motion.button>
      </motion.div>

      {cashOutHistory.length > 0 && (
        <motion.div className="cash-out-history-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3>Cash Out History</h3>
          <ul>
            {cashOutHistory.map((entry) => (
              <li key={entry.id} className="history-item">
                <p className="history-date">{entry.date}</p>
                <p className="history-description">{entry.description}: {earnings.currency} {entry.amount.toFixed(2)}</p>
                <button onClick={() => handleDeleteCashOut(entry.id)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {bookings.length > 0 && (
        <motion.div className="bookings-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h3>Your Bookings</h3>
          <ul>
            {bookings.map((booking, index) => (
              <li key={index} className="booking-item">
                {booking.name} - {booking.cashback} {earnings.currency}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CashOutPage;
