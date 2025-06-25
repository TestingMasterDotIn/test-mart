
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { products, categories, Product } from '@/data/products';
import { Star, ShoppingCart, Eye } from 'lucide-react';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const { addToCart } = useCart();

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
        default:
          return a.name.localeCompare(b.name);
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
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4" data-testid="products-title">
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
                <SelectItem value="name" data-testid="sort-name">Name (A-Z)</SelectItem>
                <SelectItem value="price-low" data-testid="sort-price-low">Price (Low to High)</SelectItem>
                <SelectItem value="price-high" data-testid="sort-price-high">Price (High to Low)</SelectItem>
                <SelectItem value="rating" data-testid="sort-rating">Rating (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-gray-600" data-testid="products-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
          {filteredProducts.map(product => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow flex flex-col h-full" data-testid={`product-card-${product.id}`}>
              <CardContent className="p-4 flex-1">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    data-testid={`product-image-${product.id}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2" data-testid={`product-name-${product.id}`}>
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 ml-1" data-testid={`product-rating-${product.id}`}>
                        {product.rating}
                      </span>
                    </div>
                    <Badge variant="secondary" data-testid={`product-category-${product.id}`}>
                      {product.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2" data-testid={`product-description-${product.id}`}>
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary" data-testid={`product-price-${product.id}`}>
                      ${product.price}
                    </span>
                    {!product.inStock && (
                      <Badge variant="destructive" data-testid={`product-out-of-stock-${product.id}`}>
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 space-x-2 mt-auto">
                <Link to={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full" data-testid={`view-details-${product.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </Link>
                
                <Button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1"
                  data-testid={`add-to-cart-${product.id}`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12" data-testid="no-products-message">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;
