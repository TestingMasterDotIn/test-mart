
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { products } from '@/data/products';
import { Star, ShoppingCart, ArrowLeft, Heart, GitCompare } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useComparison();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link to="/products">
              <Button>Back to Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6" data-testid="back-to-products">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="product-detail-image"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="product-detail-name">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg text-gray-600 ml-1" data-testid="product-detail-rating">
                    {product.rating}
                  </span>
                </div>
                <Badge variant="secondary" data-testid="product-detail-category">
                  {product.category}
                </Badge>
              </div>
            </div>

            <div className="text-4xl font-bold text-primary" data-testid="product-detail-price">
              ${product.price}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600" data-testid="product-detail-description">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Availability:</span>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800" data-testid="product-in-stock">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive" data-testid="product-out-of-stock">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  size="lg"
                  className="flex-1 card-button"
                  data-testid="add-to-cart-detail"
                  data-component-name="Card"
                >
                  <ShoppingCart className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span className="whitespace-nowrap">Add to Cart</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(product)}
                  size="lg"
                  className={`px-4 ${isInWishlist(product.id) ? 'text-red-500 border-red-500' : ''}`}
                  data-testid="toggle-wishlist-detail"
                  title="Add to Wishlist"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addToCompare(product)}
                  size="lg"
                  className={`px-4 ${isInCompare(product.id) ? 'text-blue-500 border-blue-500' : ''}`}
                  disabled={isInCompare(product.id)}
                  data-testid="add-to-compare-detail"
                  title="Add to Compare"
                >
                  <GitCompare className={`h-5 w-5 ${isInCompare(product.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
