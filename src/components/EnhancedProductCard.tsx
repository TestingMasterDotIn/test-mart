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
        className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">
              NEW
            </Badge>
          )}
          {isTrending && (
            <Badge className="bg-orange-500 hover:bg-orange-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              TRENDING
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-red-500 hover:bg-red-600">
              {Math.round(((originalPrice! - product.price) / originalPrice!) * 100)}% OFF
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-2 right-2 z-10 flex flex-col gap-1 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={handleCompareToggle}
            disabled={isInCompare(product.id)}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
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
                className="bg-white/90 hover:bg-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>

            {/* Sale Timer */}
            {isOnSale && timeLeft && (
              <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs flex items-center">
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
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
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
