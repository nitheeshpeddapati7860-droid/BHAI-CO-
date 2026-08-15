import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByHandle, addToCart } from '../services/ecommerce';
import { trackPageView, trackViewContent } from '../services/analytics';
import DeliveryChecker from '../components/DeliveryChecker';
import './ProductDetail.css';

const ProductDetail = () => {
  const { handle } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    trackPageView(`/products/${handle}`);
    
    const fetchProduct = async () => {
      try {
        const data = await getProductByHandle(handle);
        setProduct(data);
        trackViewContent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [handle]);

  if (isLoading) return <div className="container py-xl text-center">Loading product details...</div>;
  if (!product) return <div className="container py-xl text-center">Product not found. <Link to="/">Return home</Link></div>;

  const discountPercent = Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addToCart(product, 1);
    setIsAdding(false);
    alert('Added to cart!'); // Should eventually open the drawer
  };

  return (
    <div className="pdp-container">
      <div className="container py-lg">
        <div className="pdp-grid">
          
          {/* Image Gallery */}
          <div className="pdp-gallery">
            <img src={product.images[0]} alt={product.title} className="pdp-main-image" />
            {product.images.length > 1 && (
              <div className="pdp-thumbnails mt-sm">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt={`${product.title} view ${i}`} className="pdp-thumb" />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="pdp-info">
            <h1 className="pdp-title">{product.title}</h1>
            
            <div className="product-rating mb-md">
              <span className="stars">★★★★★</span>
              <span className="rating-count">(42)</span>
            </div>

            <div className="pdp-price-row mb-md">
              <span className="pdp-price">₹{product.price}</span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="pdp-compare-price">₹{product.compareAtPrice}</span>
                  <span className="pdp-discount">{discountPercent}% OFF</span>
                </>
              )}
            </div>

            <p className="pdp-description text-muted">{product.description}</p>

            {/* Desktop Add to Cart */}
            <div className="mobile-hidden mt-lg">
              <button className="btn btn-primary btn-large btn-full" onClick={handleAddToCart} disabled={isAdding}>
                {isAdding ? 'ADDING...' : 'BUY NOW'}
              </button>
            </div>

            <div className="pdp-contents mt-xl">
              <h3 className="contents-title">WHAT'S INSIDE</h3>
              <ul className="contents-list">
                {product.contents.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <DeliveryChecker />
            
            <div className="prepaid-notice mt-md text-center">
              <span className="badge badge-secondary">PREPAID ORDERS ONLY</span>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                For faster festive delivery, we are currently only accepting prepaid orders.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Buy Button */}
      <div className="mobile-sticky-buy md-hidden">
        <div className="sticky-price">
          <span className="price">₹{product.price}</span>
        </div>
        <button className="btn btn-primary" onClick={handleAddToCart} disabled={isAdding}>
          {isAdding ? 'ADDING...' : 'BUY NOW'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
