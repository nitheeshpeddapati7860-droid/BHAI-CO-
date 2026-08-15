import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../services/ecommerce';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const discountPercent = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);
  
  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigating to PDP
    await addToCart(product, 1);
    // Ideally this would trigger the cart drawer to open via context/props
    alert('Added to cart!');
  };

  return (
    <Link to={`/products/${product.handle}`} className="product-card">
      <div className="product-image-container">
        <img src={product.images[0]} alt={product.title} className="product-image" loading="lazy" />
        
        {/* Badges */}
        <div className="product-badges">
          {product.tags.includes('bestseller') && <span className="badge badge-primary">BEST SELLER</span>}
          {product.price < 400 && !product.tags.includes('bestseller') && <span className="badge badge-secondary">UNDER ₹399</span>}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">(42)</span>
        </div>

        <div className="product-price-row">
          <span className="price">₹{product.price}</span>
          {product.compareAtPrice > product.price && (
            <>
              <span className="compare-price">₹{product.compareAtPrice}</span>
              <span className="discount-badge">{discountPercent}% OFF</span>
            </>
          )}
        </div>

        <button className="btn btn-primary btn-full quick-add-btn" onClick={handleAddToCart}>
          ADD TO CART
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
