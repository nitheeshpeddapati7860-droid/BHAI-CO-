const domain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const storefrontToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

// Fallback to mock data if env vars are missing, just so the UI doesn't crash during development
import { mockProducts } from '../data/mockProducts';

const getGraphQLUrl = () => `https://${domain}/api/2024-01/graphql.json`;

const fetchShopify = async (query, variables = {}) => {
  if (!domain || !storefrontToken) {
    console.warn("Shopify env variables missing. Falling back to mock data or failing gracefully.");
    return null;
  }

  const response = await fetch(getGraphQLUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  
  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }
  
  const json = await response.json();
  if (json.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(json.errors)}`);
  }
  
  return json.data;
};

// --- Adapters to map Shopify data to our UI format ---

const mapShopifyProduct = (node) => {
  if (!node) return null;
  
  // Try to parse out contents if they put it in the description, otherwise fallback
  const contents = node.description.split('\n').filter(line => line.startsWith('-')).map(line => line.replace('-', '').trim());

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.descriptionHtml || node.description,
    price: node.variants.edges[0]?.node.price.amount || 0,
    compareAtPrice: node.variants.edges[0]?.node.compareAtPrice?.amount || null,
    images: node.images.edges.map(img => img.node.url),
    category: "", // Map via tags or collections if needed
    tags: node.tags || [],
    inventory: node.totalInventory || 50,
    contents: contents.length > 0 ? contents : ["Premium Rakhi", "Chocolates", "Roli Chawal"], // Fallback
    variants: node.variants.edges.map(v => ({
      id: v.node.id,
      title: v.node.title,
      price: v.node.price.amount,
      sku: v.node.sku
    }))
  };
};

// --- Public API ---

export const getProducts = async () => {
  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            descriptionHtml
            tags
            images(first: 3) {
              edges {
                node {
                  url
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                  sku
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchShopify(query);
    if (!data) return mockProducts; // Fallback
    
    return data.products.edges.map(edge => mapShopifyProduct(edge.node));
  } catch (error) {
    console.error(error);
    return mockProducts; // Fallback for local testing
  }
};

export const getProductByHandle = async (handle) => {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        handle
        title
        description
        descriptionHtml
        tags
        images(first: 5) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              title
              price {
                amount
              }
              compareAtPrice {
                amount
              }
              sku
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchShopify(query, { handle });
    if (!data || !data.product) {
      // Fallback
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockProducts.find(p => p.handle === handle)), 300);
      });
    }
    return mapShopifyProduct(data.product);
  } catch (error) {
    console.error(error);
    return mockProducts.find(p => p.handle === handle);
  }
};

export const getCollection = async (collectionHandle) => {
  const query = `
    query getCollectionByHandle($handle: String!) {
      collection(handle: $handle) {
        products(first: 20) {
          edges {
            node {
              id
              handle
              title
              description
              descriptionHtml
              tags
              totalInventory
              images(first: 3) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                    }
                    compareAtPrice {
                      amount
                    }
                    sku
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchShopify(query, { handle: collectionHandle });
    if (!data || !data.collection) {
      // If collection doesn't exist in Shopify, return all products as fallback
      const allProducts = await getProducts();
      return allProducts;
    }
    return data.collection.products.edges.map(edge => mapShopifyProduct(edge.node));
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Local Cart Management
// In a true headless setup, you would use Shopify's cartCreate mutation. 
// For simplicity and speed for this MVP, we maintain the cart locally until checkout.

export const addToCart = async (product, quantity = 1, variantId = null) => {
  return new Promise((resolve) => {
    const cart = JSON.parse(localStorage.getItem('bco_cart') || '[]');
    const idToUse = variantId || product.variants[0].id;
    const existing = cart.find(item => item.variantId === idToUse);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity, variantId: idToUse });
    }
    
    localStorage.setItem('bco_cart', JSON.stringify(cart));
    resolve(cart);
  });
};

export const getCart = async () => {
  return JSON.parse(localStorage.getItem('bco_cart') || '[]');
};

export const removeFromCart = async (productId) => {
  let cart = JSON.parse(localStorage.getItem('bco_cart') || '[]');
  cart = cart.filter(item => item.product.id !== productId);
  localStorage.setItem('bco_cart', JSON.stringify(cart));
  return cart;
};

export const updateCartItem = async (productId, quantity) => {
  let cart = JSON.parse(localStorage.getItem('bco_cart') || '[]');
  const item = cart.find(i => i.product.id === productId);
  if (item) {
    item.quantity = quantity;
  }
  localStorage.setItem('bco_cart', JSON.stringify(cart));
  return cart;
};

// Create a real Shopify Checkout URL using the Cart API
export const checkout = async (cartItems) => {
  if (!domain || !storefrontToken) {
    console.warn("No env vars, using mock checkout.");
    localStorage.removeItem('bco_cart');
    return { success: true, orderId: "MOCK-1234" };
  }

  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const lines = cartItems.map(item => ({
    merchandiseId: item.variantId,
    quantity: item.quantity
  }));

  try {
    const data = await fetchShopify(query, {
      input: { lines }
    });

    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }

    localStorage.removeItem('bco_cart');
    
    // Return the URL so the UI can redirect the user to the real Shopify checkout page
    return { 
      success: true, 
      redirectUrl: data.cartCreate.cart.checkoutUrl 
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return { success: false, error: error.message };
  }
};
