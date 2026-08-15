import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#2c2c2c', color: 'white', padding: '3rem 1rem', marginTop: '4rem' }}>
      <div className="container text-center flex-col items-center gap-md">
        <h2 className="font-serif" style={{ color: 'white' }}>Bhai & Co.</h2>
        <p>“Gifts that say it for you.”</p>
        
        <div className="flex justify-center gap-md mt-md" style={{ flexWrap: 'wrap' }}>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/shipping">Shipping Policy</Link>
          <Link to="/refunds">Refund Policy</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/track-order">Track Order</Link>
        </div>
        
        <p className="text-muted mt-lg">© 2026 Bhai & Co. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
