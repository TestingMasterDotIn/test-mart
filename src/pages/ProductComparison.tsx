import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { X, Star, ShoppingCart, ArrowLeft } from 'lucide-react';

const ProductComparison = () => {
  const { compareList, removeFromCompare, clearCompare } = useComparison();
  const { addToCart } = useCart();

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Comparison</h1>
            <p className="text-muted-foreground mb-8">
              No products to compare. Add products from the product pages to get started.
            </p>
            <Link to="/products">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: typeof compareList[0]) => {
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
            <h1 className="text-3xl font-bold">Product Comparison</h1>
            <p className="text-muted-foreground">Compare {compareList.length} products side by side</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearCompare}>
              Clear All
            </Button>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {compareList.map((product) => (
            <Card key={product.id} className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
                onClick={() => removeFromCompare(product.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardHeader className="pb-4">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Price:</span>
                    <span className="font-semibold text-lg">${product.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Stock:</span>
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  
                  <div>
                    <span className="text-sm text-muted-foreground">Description:</span>
                    <p className="text-sm mt-1">{product.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
