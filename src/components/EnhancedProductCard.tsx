import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import QuickViewModal from './QuickViewModal';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  GitCompare, 
  Eye, 
  Share2,
  TrendingUp,
  Clock
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EnhancedProductCardProps {
  product: Product;
  onProductView?: (productId: string) => void;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({ 
  product, 
  onProductView 
}) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useComparison();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
    if (onProductView) {
      onProductView(product.id);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.origin + `/products/${product.id}`
        });
      } catch (err) {
        // Fallback to clipboard
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + `/products/${product.id}`);
    toast({
      title: "Link Copied",
      description: "Product link has been copied to clipboard."
    });
  };

  // Mock data for enhanced features
  const isOnSale = Math.random() > 0.7;
  const originalPrice = isOnSale ? product.price * 1.2 : null;
  const isNew = Math.random() > 0.8;
  const isTrending = Math.random() > 0.85;
  const timeLeft = isOnSale ? `${Math.floor(Math.random() * 24)}h ${Math.floor(Math.random() * 60)}m` : null;

  return (
    <>
      <Card 
        className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-testid={`product-card-${product.id}`}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
              NEW
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1" />
              TRENDING
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
              {Math.round(((originalPrice! - product.price) / originalPrice!) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Wishlist Button - Always Visible */}
        <div className="absolute top-3 right-3 z-10">
          <Button
            size="sm"
            variant="secondary"
            className={`h-12 w-12 p-0 rounded-full shadow-lg border border-border/50 backdrop-blur-sm transition-all duration-200 ${
              isInWishlist(product.id) 
                ? 'bg-red-50 hover:bg-red-100 border-red-200' 
                : 'bg-background/95 hover:bg-primary hover:text-primary-foreground'
            }`}
            onClick={handleWishlistToggle}
            data-testid={`toggle-wishlist-${product.id}`}
          >
            <Heart className={`h-6 w-6 transition-all duration-200 ${
              isInWishlist(product.id) 
                ? 'fill-red-500 text-red-500 scale-110' 
                : 'text-foreground/70'
            }`} />
          </Button>
        </div>

        {/* Secondary Action Buttons - Show on Hover */}
        <div className={`absolute top-18 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-2'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-background/90 hover:bg-primary hover:text-primary-foreground shadow-lg border border-border/50 backdrop-blur-sm"
            onClick={handleCompareToggle}
            disabled={isInCompare(product.id)}
            data-testid={`add-to-compare-${product.id}`}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-9 w-9 p-0 bg-background/90 hover:bg-primary hover:text-primary-foreground shadow-lg border border-border/50 backdrop-blur-sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-100 relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Quick View Overlay */}
            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button
                variant="secondary"
                onClick={handleQuickView}
                className="bg-background/95 hover:bg-primary hover:text-primary-foreground shadow-lg backdrop-blur-sm border border-border/50"
                data-testid={`quick-view-${product.id}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>

            {/* Sale Timer */}
            {isOnSale && timeLeft && (
              <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded-lg text-xs flex items-center shadow-lg">
                <Clock className="h-3 w-3 mr-1" />
                {timeLeft}
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <Badge variant="outline" className="ml-2 text-xs">
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
                  ({Math.floor(Math.random() * 100) + 10})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">
                {product.description}
              </p>
            </div>
          </CardContent>
        </Link>

        {/* Add to Cart Button */}
        <div className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 font-semibold border-0"
            size="sm"
            data-testid={`add-to-cart-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Card>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default EnhancedProductCard;
