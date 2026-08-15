import React from 'react';
import { PackageOpen, CreditCard, Gift, Lock } from 'lucide-react';
import './TrustSection.css';

const TrustSection = () => {
  return (
    <section className="trust-section bg-light py-xl">
      <div className="container">
        <h2 className="section-title text-center mb-lg">Why Shop Bhai & Co.?</h2>
        
        <div className="trust-grid">
          <div className="trust-card text-center">
            <div className="trust-icon-wrapper mx-auto mb-md">
              <Gift size={32} className="trust-icon" />
            </div>
            <h3 className="trust-title">Ready-to-Gift</h3>
            <p className="trust-desc text-muted">Beautifully selected Rakhi gift combinations.</p>
          </div>
          
          <div className="trust-card text-center">
            <div className="trust-icon-wrapper mx-auto mb-md">
              <PackageOpen size={32} className="trust-icon" />
            </div>
            <h3 className="trust-title">Simple Shopping</h3>
            <p className="trust-desc text-muted">Choose a gift, enter the delivery details and pay online.</p>
          </div>
          
          <div className="trust-card text-center">
            <div className="trust-icon-wrapper mx-auto mb-md">
              <CreditCard size={32} className="trust-icon" />
            </div>
            <h3 className="trust-title">Festive Pricing</h3>
            <p className="trust-desc text-muted">Affordable gifting options without inflated luxury pricing.</p>
          </div>
          
          <div className="trust-card text-center">
            <div className="trust-icon-wrapper mx-auto mb-md">
              <Lock size={32} className="trust-icon" />
            </div>
            <h3 className="trust-title">Secure Checkout</h3>
            <p className="trust-desc text-muted">Safe online payment experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
