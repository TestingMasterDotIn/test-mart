import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

interface RecommendationEngine {
  similarProducts: Product[];
  trendingProducts: Product[];
  personalizedProducts: Product[];
  recentlyViewed: Product[];
  frequentlyBoughtTogether: Product[];
}

export const useRecommendations = (currentProduct?: Product, allProducts: Product[] = []) => {
  const [recommendations, setRecommendations] = useState<RecommendationEngine>({
    similarProducts: [],
    trendingProducts: [],
    personalizedProducts: [],
    recentlyViewed: [],
    frequentlyBoughtTogether: []
  });
  
  const { items: cartItems } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (allProducts.length === 0) return;

    // Get recently viewed products from localStorage
    const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]')
      .map((id: string) => allProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4);

    // Generate similar products based on category
    const similarProducts = currentProduct 
      ? allProducts
          .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4)
      : [];

    // Generate trending products (high rating + in stock)
    const trendingProducts = allProducts
      .filter(p => p.inStock && p.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    // Generate personalized recommendations based on cart items
    const cartCategories = [...new Set(cartItems.map(item => {
      const product = allProducts.find(p => p.id === item.id);
      return product?.category;
    }).filter(Boolean))];

    const personalizedProducts = allProducts
      .filter(p => cartCategories.includes(p.category) && !cartItems.some(item => item.id === p.id))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);

    // Frequently bought together (mock algorithm based on category matching)
    const frequentlyBoughtTogether = currentProduct
      ? allProducts
          .filter(p => p.id !== currentProduct.id && 
                      (p.category === currentProduct.category || 
                       Math.random() > 0.7)) // Add some randomness for demo
          .slice(0, 3)
      : [];

    setRecommendations({
      similarProducts,
      trendingProducts,
      personalizedProducts,
      recentlyViewed,
      frequentlyBoughtTogether
    });
  }, [currentProduct, allProducts, cartItems, user]);

  // Function to track product views
  const trackProductView = (productId: string) => {
    const recentlyViewed = JSON.parse(localStorage.getItem('recently_viewed') || '[]');
    const updated = [productId, ...recentlyViewed.filter((id: string) => id !== productId)].slice(0, 10);
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
  };

  return {
    ...recommendations,
    trackProductView
  };
};
