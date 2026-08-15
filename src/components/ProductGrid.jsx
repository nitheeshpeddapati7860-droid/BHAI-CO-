import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, title }) => {
  if (!products || products.length === 0) return null;
  
  return (
    <section className="product-grid-section container py-xl">
      {title && <h2 className="section-title text-center mb-lg">{title}</h2>}
      
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
