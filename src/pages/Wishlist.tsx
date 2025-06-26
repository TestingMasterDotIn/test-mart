import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart, ArrowLeft, X, Star } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Save products you love to your wishlist and buy them later.
            </p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: typeof wishlist[0]) => {
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">{wishlist.length} items saved</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} className="group relative overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white"
                onClick={() => removeFromWishlist(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="aspect-square overflow-hidden bg-gray-100">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
