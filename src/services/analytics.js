import { getUTMParams } from '../utils/utm';

export const trackEvent = (eventName, eventData = {}) => {
  const utmParams = getUTMParams();
  
  const payload = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...eventData,
    ...utmParams
  };

  // Mock implementation for development
  console.log(`[Analytics] Tracked Event: ${eventName}`, payload);
  
  // Example of future real implementation:
  // if (window.fbq) {
  //   window.fbq('track', eventName, eventData);
  // }
};

export const trackPageView = (pagePath) => {
  trackEvent('page_view', { path: pagePath });
};

export const trackViewContent = (product) => {
  trackEvent('view_content', {
    content_ids: [product.id],
    content_name: product.title,
    content_type: 'product',
    value: product.price,
    currency: 'INR'
  });
};

export const trackAddToCart = (product, quantity = 1) => {
  trackEvent('add_to_cart', {
    content_ids: [product.id],
    content_name: product.title,
    content_type: 'product',
    value: product.price * quantity,
    currency: 'INR',
    quantity: quantity
  });
};

export const trackBeginCheckout = (cartItems, totalValue) => {
  trackEvent('begin_checkout', {
    content_ids: cartItems.map(item => item.product.id),
    value: totalValue,
    currency: 'INR',
    num_items: cartItems.length
  });
};

export const trackPurchase = (orderId, cartItems, totalValue) => {
  trackEvent('purchase', {
    transaction_id: orderId,
    content_ids: cartItems.map(item => item.product.id),
    value: totalValue,
    currency: 'INR',
    num_items: cartItems.length
  });
};
