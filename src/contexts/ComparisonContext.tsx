import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/products';
import { toast } from '@/hooks/use-toast';

interface ComparisonContextType {
  compareList: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    if (compareList.length >= 4) {
      toast({
        title: "Comparison Limit Reached",
        description: "You can only compare up to 4 products at once.",
        variant: "destructive"
      });
      return;
    }

    if (compareList.some(item => item.id === product.id)) {
      toast({
        title: "Already in Comparison",
        description: "This product is already in your comparison list.",
        variant: "destructive"
      });
      return;
    }

    setCompareList(prev => [...prev, product]);
    toast({
      title: "Added to Comparison",
      description: `${product.name} has been added to comparison.`
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Removed from Comparison",
      description: "Product has been removed from comparison."
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    toast({
      title: "Comparison Cleared",
      description: "All products have been removed from comparison."
    });
  };

  const isInCompare = (productId: string) => {
    return compareList.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};
