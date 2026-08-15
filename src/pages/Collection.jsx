import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCollection } from '../services/ecommerce';
import { trackPageView } from '../services/analytics';
import ProductGrid from '../components/ProductGrid';

const Collection = () => {
  const { handle } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trackPageView(`/collections/${handle}`);
    
    const fetchCollection = async () => {
      try {
        const data = await getCollection(handle);
        setProducts(data);
      } catch (error) {
        console.error("Error loading collection", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollection();
  }, [handle]);

  const collectionTitles = {
    'rakhi-gifts': 'All Rakhi Gifts',
    'under-399': 'Gifts Under ₹399',
    'premium-picks': 'Premium Gift Sets',
    'best-sellers': 'Best Sellers'
  };

  const title = collectionTitles[handle] || 'Collection';

  return (
    <div className="collection-page">
      <div className="container py-lg text-center" style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="font-serif" style={{ color: 'var(--color-primary-dark)' }}>{title}</h1>
        <p className="text-muted mt-sm">Find the perfect gift for your brother.</p>
      </div>

      {isLoading ? (
        <div className="container py-xl text-center">Loading collection...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Collection;
