import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import './Header.css';

const Header = ({ onCartClick }) => {
  return (
    <header className="header-wrapper">
      <div className="container header-container">
        {/* Mobile Menu Icon */}
        <button className="md-hidden icon-btn" aria-label="Menu">
          <Menu size={24} />
        </button>

        {/* Desktop Nav - Left */}
        <nav className="desktop-nav md-flex mobile-hidden">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/collections/rakhi-gifts" className="nav-link">Rakhi Gifts</Link>
          <Link to="/collections/under-399" className="nav-link">Under ₹399</Link>
        </nav>

        {/* Logo - Center */}
        <div className="logo-container">
          <Link to="/" className="logo-text">Bhai & Co.</Link>
        </div>

        {/* Right Nav */}
        <div className="right-nav">
          <button className="icon-btn mobile-hidden" aria-label="Search">
            <Search size={24} />
          </button>
          <button className="icon-btn cart-btn" aria-label="Cart" onClick={onCartClick}>
            <ShoppingBag size={24} />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
