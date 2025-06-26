import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { Star, ShoppingCart, Heart, GitCompare, Share2, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCompare, isInCompare } = useComparison();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleShare = async () => {
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

  // Mock multiple images for demo
  const productImages = [
    product.image,
    product.image.replace('w=400', 'w=400&sat=-100'), // B&W version
    product.image.replace('w=400', 'w=400&hue=120'), // Different hue
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Quick View</span>
            <Badge variant={product.inStock ? "default" : "destructive"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold">{product.name}</h3>
              <Badge variant="outline" className="mt-2">
                {product.category}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
              </span>
            </div>

            <div className="text-3xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Key Features */}
            <div>
              <h4 className="font-semibold mb-2">Key Features</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• 1-year warranty included</li>
                <li>• Free shipping on orders over $50</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>

            <Separator />

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <Card>
                <CardContent className="p-3">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-xs text-muted-foreground">Sold Today</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.floor(Math.random() * 20) + 5}
                  </div>
                  <div className="text-xs text-muted-foreground">In Stock</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.floor(Math.random() * 100) + 50}
                  </div>
                  <div className="text-xs text-muted-foreground">Views</div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => toggleWishlist(product)}
                  className={isInWishlist(product.id) ? 'text-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addToCompare(product)}
                  disabled={isInCompare(product.id)}
                >
                  <GitCompare className="h-4 w-4" />
                </Button>
                
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => {
                  onClose();
                  window.open(`/products/${product.id}`, '_blank');
                }}
                className="w-full"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
