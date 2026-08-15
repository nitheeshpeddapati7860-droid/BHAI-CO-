import React, { useState } from 'react';
import { checkPincode } from '../services/delivery';
import { MapPin } from 'lucide-react';
import './DeliveryChecker.css';

const DeliveryChecker = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!pincode) return;
    
    setIsLoading(true);
    try {
      const res = await checkPincode(pincode);
      setResult(res);
    } catch (err) {
      setResult({ valid: false, message: 'Failed to verify pincode. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="delivery-checker mt-md">
      <h4 className="delivery-title flex items-center gap-sm">
        <MapPin size={18} /> Delivery Information
      </h4>
      <form onSubmit={handleCheck} className="pincode-form mt-sm">
        <input 
          type="text" 
          placeholder="Enter 6-digit Pincode" 
          className="pincode-input"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
        />
        <button type="submit" className="btn btn-secondary check-btn" disabled={isLoading || pincode.length !== 6}>
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </form>
      
      {result && (
        <div className={`pincode-result mt-sm ${result.valid ? 'text-success' : 'text-error'}`}>
          {result.message}
        </div>
      )}
      
      <p className="delivery-disclaimer text-muted mt-sm">
        Delivery estimates may vary by location and courier conditions.
      </p>
    </div>
  );
};

export default DeliveryChecker;
