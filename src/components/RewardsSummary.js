import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RewardsSummary.css';

// Dummy data (mock JSON)
const mockEarnings = {
  balance: 150.75,
  currency: 'USD',
  breakdown: { bookingA: 50, bookingB: 75, bookingC: 25 },
};

// Booking options
const availableBookings = [
  { id: 1, name: 'Hotel Stay', cashback: 20 },
  { id: 2, name: 'Flight Booking', cashback: 50 },
  { id: 3, name: 'Car Rental', cashback: 30 },
  { id: 4, name: 'Luxury Cruise', cashback: 200 },
  { id: 5, name: 'Exclusive Spa Package', cashback: 150 },
  { id: 6, name: 'High-End Restaurant Dining', cashback: 100 },
  { id: 7, name: 'Weekend Getaway', cashback: 180 },
  { id: 8, name: 'VIP Concert Tickets', cashback: 250 },
  { id: 9, name: 'Golf Club Membership', cashback: 300 },
  { id: 10, name: 'Adventure Tour', cashback: 120 },
  { id: 11, name: 'Ski Resort Package', cashback: 220 },
  { id: 12, name: 'Luxury Safari Experience', cashback: 350 },
  { id: 13, name: 'Private Yacht Charter', cashback: 400 },
  { id: 14, name: 'Fine Wine Tasting Event', cashback: 90 },
  { id: 15, name: 'Exclusive Art Gallery Tour', cashback: 130 },
  { id: 16, name: 'Helicopter Ride', cashback: 250 },
  { id: 17, name: 'Bungee Jumping Experience', cashback: 80 },
  { id: 18, name: 'Designer Shopping Spree', cashback: 300 },
  { id: 19, name: 'Personalized Cooking Class', cashback: 140 },
  { id: 20, name: 'Luxury Ski Lodge Stay', cashback: 280 },
];

const RewardsSummary = ({ onBookingMade }) => {
  const [earnings] = useState(mockEarnings);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Load bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save bookings to localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleBooking = () => {
    const booking = availableBookings.find((b) => b.name === selectedBooking);
    if (booking) {
      setBookings((prevBookings) => [...prevBookings, booking]);
      setSelectedBooking('');
      onBookingMade(booking.cashback); // Update earnings in parent
    }
  };

  const handleDeleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  return (
    <motion.div
      className="rewards-summary container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Loading Animation */}
      {loading ? (
        <motion.div
          className="loading-spinner"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <span>Loading...</span>
        </motion.div>
      ) : (
        <div className="content">
          {/* Earnings Summary */}
          <motion.div
            className="earnings-section"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="balance">
              Total Earnings: <span className="currency">{earnings.currency}</span> {earnings.balance.toFixed(2)}
            </p>
            <div className="breakdown-section">
              <h3>Earnings Breakdown</h3>
              <ul>
                {Object.entries(earnings.breakdown).map(([key, value]) => (
                  <li key={key} className="breakdown-item">
                    <span className="breakdown-key">{key}</span>: <span className="breakdown-value">{earnings.currency} {value.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Booking Section */}
          <motion.div className="booking-section">
            <h3>Book a Service</h3>
            <select value={selectedBooking} onChange={(e) => setSelectedBooking(e.target.value)} className="booking-select">
              <option value="">Choose a service</option>
              {availableBookings.map((booking) => (
                <option key={booking.id} value={booking.name}>
                  {booking.name} - {booking.cashback} {earnings.currency}
                </option>
              ))}
            </select>
            <motion.button className="button" onClick={handleBooking} disabled={!selectedBooking}>
              Book Now
            </motion.button>

            {bookings.length > 0 && (
              <div className="bookings-list">
                <h4>Your Bookings</h4>
                <ul>
                  {bookings.map((booking) => (
                    <li key={booking.id} className="booking-item">
                      {booking.name} - {booking.cashback} {earnings.currency}
                      <button onClick={() => handleDeleteBooking(booking.id)} className="delete-button">Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default RewardsSummary;
