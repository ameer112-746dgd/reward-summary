import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CashbackPage = ({ onCashbackClaimed }) => {
  const [earnings, setEarnings] = useState({ balance: 0, currency: 'USD' });
  const [transactions, setTransactions] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoStatus, setPromoStatus] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const storedEarnings = JSON.parse(localStorage.getItem('earnings'));
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    if (storedEarnings) setEarnings(storedEarnings);
    if (storedTransactions) setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('earnings', JSON.stringify(earnings));
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [earnings, transactions]);

  const handleDailyCashbackClaim = () => {
    const dailyCashback = 5; // Example daily cashback amount
    const newBalance = earnings.balance + dailyCashback;
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      amount: dailyCashback,
      description: 'Daily Cashback Claim',
    };
    setEarnings({ ...earnings, balance: newBalance });
    setTransactions([...transactions, newTransaction]);
    setShowHistory(true);

    if (typeof onCashbackClaimed === 'function') {
      onCashbackClaimed(dailyCashback);
    } else {
      console.error('onCashbackClaimed is not a function');
    }
  };

  const handlePromoCode = () => {
    const promoCodePattern = /^[0-9]{6}$/;
    if (promoCodePattern.test(promoCode)) {
      const promoCodeDiscount = 10;
      setEarnings((prevEarnings) => ({
        ...prevEarnings,
        balance: prevEarnings.balance + promoCodeDiscount,
      }));
      setPromoStatus(`Promo code applied! You received $${promoCodeDiscount}.`);
      setPromoCode('');
    } else {
      setPromoStatus('Invalid promo code. Please enter a 6-digit code.');
    }
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <motion.div className="cashback-page container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <h2 className="heading">Cashback Rewards</h2>

      <motion.div className="daily-cashback-section">
        <h3>Claim Daily Cashback</h3>
        <motion.button className="button" onClick={handleDailyCashbackClaim}>
          Claim Cashback
        </motion.button>
      </motion.div>

      <motion.div className="promo-code-section">
        <h3>Apply Promo Code</h3>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter 6-digit promo code"
          className="promo-code-input"
        />
        <motion.button className="button" onClick={handlePromoCode}>
          Apply Code
        </motion.button>
        {promoStatus && <p className="promo-status">{promoStatus}</p>}
      </motion.div>
      
      <motion.div className="earnings-section">
        <h3>Your Current Balance</h3>
        <p className="balance">
          {earnings.currency} {earnings.balance.toFixed(2)}
        </p>
      </motion.div>

      {showHistory && transactions.length > 0 && (
        <motion.div className="transaction-history-section">
          <h3>Cashback History</h3>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className="transaction-item">
                <p className="transaction-date">{transaction.date} at {transaction.time}</p>
                <p className="transaction-description">{transaction.description}: {earnings.currency} {transaction.amount.toFixed(2)}</p>
                <button onClick={() => handleDeleteTransaction(transaction.id)} className="delete-button">Delete</button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CashbackPage;
