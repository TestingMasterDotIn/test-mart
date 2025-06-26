import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      toast({
        title: "Already in Wishlist",
        description: "This product is already in your wishlist.",
        variant: "destructive"
      });
      return;
    }

    setWishlist(prev => [...prev, product]);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`
    });
  };

  const removeFromWishlist = (productId: string) => {
    const product = wishlist.find(item => item.id === productId);
    setWishlist(prev => prev.filter(item => item.id !== productId));
    
    if (product) {
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`
      });
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist."
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
