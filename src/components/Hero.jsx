import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content text-center flex-col items-center justify-center">
        <h1 className="hero-title">This Rakhi, Don’t Just Send a Rakhi.</h1>
        <p className="hero-subtitle">Send your brother a gift he’ll actually remember.</p>
        
        <div className="hero-cta-group mt-lg">
          <Link to="/collections/rakhi-gifts" className="btn btn-primary btn-large">SHOP RAKHI GIFTS</Link>
          <Link to="/collections/best-sellers" className="btn btn-secondary btn-large mt-sm">EXPLORE BEST SELLERS</Link>
        </div>

        <div className="hero-trust-indicators mt-xl flex justify-center gap-lg text-muted">
          <div className="trust-item flex items-center gap-sm">
            <span className="icon">✓</span> Ready-to-Gift
          </div>
          <div className="trust-item flex items-center gap-sm">
            <span className="icon">✓</span> Prepaid Orders
          </div>
          <div className="trust-item flex items-center gap-sm">
            <span className="icon">✓</span> Delivery Across India
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
