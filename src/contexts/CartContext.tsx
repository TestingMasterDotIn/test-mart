
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  applyCoupon: (code: string) => boolean;
  discount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const validCoupons: Record<string, number> = {
  'SAVE10': 0.1,
  'WELCOME20': 0.2,
  'TEST50': 0.5
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart_items');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    console.log('API Call: Add to cart', product);
    
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  const removeFromCart = (id: string) => {
    console.log('API Call: Remove from cart', { productId: id });
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart."
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
    localStorage.removeItem('cart_items');
  };

  const applyCoupon = (code: string): boolean => {
    console.log('API Call: Apply coupon', { code });
    
    if (validCoupons[code]) {
      setDiscount(validCoupons[code]);
      toast({
        title: "Coupon Applied",
        description: `${(validCoupons[code] * 100)}% discount applied!`
      });
      return true;
    }

    toast({
      title: "Invalid Coupon",
      description: "The coupon code you entered is not valid.",
      variant: "destructive"
    });
    return false;
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      applyCoupon,
      discount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
