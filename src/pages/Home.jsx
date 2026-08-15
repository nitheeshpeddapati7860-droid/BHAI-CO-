import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import UrgencyBar from '../components/UrgencyBar';
import ProductGrid from '../components/ProductGrid';
import TrustSection from '../components/TrustSection';
import { getProducts } from '../services/ecommerce';
import { trackPageView } from '../services/analytics';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track page view
    trackPageView('/');

    // Fetch products
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Prepare categories
  const bestSellers = products.filter(p => p.tags.includes('bestseller')).slice(0, 4);
  const under399 = products.filter(p => p.price <= 399).slice(0, 4);
  const premiumPicks = products.filter(p => p.price >= 599).slice(0, 4);
  
  // The primary advertising range section (399-599)
  const mainCollection = products.filter(p => p.price >= 399 && p.price < 599).slice(0, 4);

  return (
    <div className="home-page">
      <Hero />
      <UrgencyBar />
      
      {isLoading ? (
        <div className="container py-xl text-center"><p>Loading perfect gifts...</p></div>
      ) : (
        <>
          <ProductGrid products={bestSellers} title="The Gifts Everyone’s Picking" />
          
          <TrustSection />
          
          <div style={{ backgroundColor: 'var(--color-surface)' }}>
             <ProductGrid products={under399} title="Affordable Gifts Under ₹399" />
          </div>
          
          <ProductGrid products={mainCollection} title="Rakhi Gifts for Every Kind of Bhai" />
        </>
      )}
    </div>
  );
};

export default Home;
