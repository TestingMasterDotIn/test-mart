
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import EnhancedProductCard from '@/components/EnhancedProductCard';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { products, categories, Product } from '@/data/products';

const Products = () => {
  // Sort products by ID initially
  const initialSortedProducts = [...products].sort((a, b) => parseInt(a.id) - parseInt(b.id));
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialSortedProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [filterCategory, setFilterCategory] = useState('all');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useComparison();

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'id':
          return parseInt(a.id) - parseInt(b.id);
        default:
          return parseInt(a.id) - parseInt(b.id); // Default to ID-based sorting
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, sortBy, filterCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" data-testid="products-title">
            Our Products
          </h1>
          
          {/* Filters and Sorting */}
          <div className="flex flex-wrap gap-4 mb-6" data-testid="filters-section">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-48" data-testid="category-filter">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" data-testid="category-all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    data-testid={`category-${category.toLowerCase()}`}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48" data-testid="sort-filter">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id" data-testid="sort-id">Default Order (ID)</SelectItem>
                <SelectItem value="name" data-testid="sort-name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low" data-testid="sort-price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high" data-testid="sort-price-high">Price (High to Low)</SelectItem>
                <SelectItem value="rating" data-testid="sort-rating">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-gray-600 dark:text-gray-400" data-testid="products-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="product-grid">
          {filteredProducts.map(product => (
            <EnhancedProductCard 
              key={product.id} 
              product={product}
              onProductView={(productId) => console.log('Product viewed:', productId)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12" data-testid="no-products-message">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
