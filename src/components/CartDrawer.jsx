import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { getCart, removeFromCart, updateCartItem } from '../services/ecommerce';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  const handleRemove = async (productId) => {
    const updated = await removeFromCart(productId);
    setCartItems(updated);
  };

  const handleUpdateQuantity = async (productId, currentQty, delta) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    const updated = await updateCartItem(productId, newQty);
    setCartItems(updated);
  };

  const handleCheckout = async () => {
    // If Shopify is connected, it will return a redirectUrl.
    const res = await checkout(cartItems);
    
    if (res.redirectUrl) {
      window.location.href = res.redirectUrl;
    } else {
      // Fallback to mock checkout if env vars are missing
      onClose();
      navigate('/checkout');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      
      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="flex items-center gap-sm" style={{ margin: 0, fontSize: '1.25rem' }}>
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart text-center py-xl">
              <ShoppingBag size={48} className="text-muted mx-auto mb-md" />
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-muted text-sm mt-sm">Looks like you haven't added any Rakhi gifts yet.</p>
              <button className="btn btn-primary mt-lg" onClick={onClose}>Start Shopping</button>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={`${item.product.id}-${item.variantId}`} className="cart-item">
                  <img src={item.product.images[0]} alt={item.product.title} className="cart-item-img" />
                  
                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <p className="cart-item-price">₹{item.product.price}</p>
                    
                    <div className="cart-item-actions mt-sm">
                      <div className="qty-selector">
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity, 1)}>+</button>
                      </div>
                      
                      <button className="remove-btn" onClick={() => handleRemove(item.product.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal-row mb-md">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold price text-primary">₹{subtotal}</span>
            </div>
            <p className="text-muted mb-md text-sm text-center">Shipping & taxes calculated at checkout.</p>
            <button className="btn btn-primary btn-full btn-large" onClick={handleCheckout}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
