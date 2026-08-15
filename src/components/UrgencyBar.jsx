import React from 'react';
import { Link } from 'react-router-dom';

const UrgencyBar = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-primary-dark)', color: 'var(--color-text-light)', padding: 'var(--spacing-sm)', textAlign: 'center', fontSize: '0.9rem', fontWeight: 500 }}>
      Raksha Bandhan is August 28 ❤️ Order early for the best chance of timely delivery.{' '}
      <Link to="/collections/rakhi-gifts" style={{ textDecoration: 'underline', fontWeight: 700, marginLeft: 'var(--spacing-xs)' }}>Shop Now</Link>
    </div>
  );
};

export default UrgencyBar;
