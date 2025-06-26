import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface SearchFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: string;
}

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  text: string;
  count?: number;
}

export const useAdvancedSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    minPrice: 0,
    maxPrice: 1000,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'relevance'
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('search_history') || '[]');
    setSearchHistory(history);
  }, []);

  // Save search to history
  const saveSearchToHistory = (query: string) => {
    if (query.trim() && !searchHistory.includes(query)) {
      const newHistory = [query, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('search_history', JSON.stringify(newHistory));
    }
  };

  // Generate search suggestions
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const productSuggestions = products
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 5)
      .map(p => ({ type: 'product' as const, text: p.name }));

    const categorySuggestions = [...new Set(products.map(p => p.category))]
      .filter(category => category.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 3)
      .map(category => ({
        type: 'category' as const,
        text: category,
        count: products.filter(p => p.category === category).length
      }));

    setSuggestions([...productSuggestions, ...categorySuggestions]);
  }, [searchQuery, products]);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...products];

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    filtered = filtered.filter(product => 
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Apply rating filter
    filtered = filtered.filter(product => product.rating >= filters.minRating);

    // Apply stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return parseInt(b.id) - parseInt(a.id);
        case 'relevance':
        default:
          // Simple relevance based on name match
          if (searchQuery) {
            const aScore = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
            const bScore = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
            return bScore - aScore;
          }
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, filters, products]);

  const updateFilter = (key: keyof SearchFilters, value: SearchFilters[keyof SearchFilters]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: 0,
      maxPrice: 1000,
      minRating: 0,
      inStockOnly: false,
      sortBy: 'relevance'
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search_history');
  };

  return {
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    filteredProducts,
    suggestions,
    searchHistory,
    saveSearchToHistory,
    clearSearchHistory
  };
};
