import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  targetPrice: number;
  currentPrice: number;
  email: string;
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface PriceHistory {
  productId: string;
  price: number;
  date: string;
}

interface PriceTrackingContextType {
  alerts: PriceAlert[];
  priceHistory: PriceHistory[];
  createAlert: (productId: string, productName: string, currentPrice: number, targetPrice: number, email: string) => void;
  removeAlert: (alertId: string) => void;
  getProductPriceHistory: (productId: string) => PriceHistory[];
  getActiveAlerts: () => PriceAlert[];
  checkPriceAlerts: () => void;
}

const PriceTrackingContext = createContext<PriceTrackingContextType | undefined>(undefined);

export const PriceTrackingProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [priceHistory, setPriceHistory] = useState<PriceHistory[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const savedAlerts = localStorage.getItem('price_alerts');
    const savedHistory = localStorage.getItem('price_history');
    
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
    
    if (savedHistory) {
      setPriceHistory(JSON.parse(savedHistory));
    } else {
      // Generate mock price history
      generateMockPriceHistory();
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('price_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('price_history', JSON.stringify(priceHistory));
  }, [priceHistory]);

  const generateMockPriceHistory = () => {
    const productIds = ['1', '2', '3', '4', '5'];
    const basePrices = [299.99, 249.99, 199.99, 149.99, 99.99];
    const mockHistory: PriceHistory[] = [];

    productIds.forEach((productId, index) => {
      const basePrice = basePrices[index];
      
      // Generate 30 days of price history
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Add some price variation (±10%)
        const variation = (Math.random() - 0.5) * 0.2;
        const price = Math.round((basePrice + (basePrice * variation)) * 100) / 100;
        
        mockHistory.push({
          productId,
          price,
          date: date.toISOString().split('T')[0]
        });
      }
    });

    setPriceHistory(mockHistory);
  };

  const createAlert = (productId: string, productName: string, currentPrice: number, targetPrice: number, email: string) => {
    if (targetPrice >= currentPrice) {
      toast({
        title: "Invalid Target Price",
        description: "Target price must be lower than current price.",
        variant: "destructive"
      });
      return;
    }

    // Check if alert already exists for this product
    const existingAlert = alerts.find(
      alert => alert.productId === productId && alert.email === email && alert.isActive
    );

    if (existingAlert) {
      toast({
        title: "Alert Already Exists",
        description: "You already have an active price alert for this product.",
        variant: "destructive"
      });
      return;
    }

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      productId,
      productName,
      targetPrice,
      currentPrice,
      email,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setAlerts(prev => [...prev, newAlert]);
    toast({
      title: "Price Alert Created",
      description: `You'll be notified when ${productName} drops to $${targetPrice.toFixed(2)}.`
    });
  };

  const removeAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    toast({
      title: "Alert Removed",
      description: "Price alert has been removed."
    });
  };

  const getProductPriceHistory = (productId: string) => {
    return priceHistory
      .filter(entry => entry.productId === productId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const getActiveAlerts = () => {
    return alerts.filter(alert => alert.isActive);
  };

  const checkPriceAlerts = () => {
    // Simulate price changes and check alerts
    const activeAlerts = getActiveAlerts();
    
    activeAlerts.forEach(alert => {
      // Simulate random price drop (10% chance)
      if (Math.random() < 0.1) {
        const newPrice = alert.targetPrice - (Math.random() * 10);
        
        if (newPrice <= alert.targetPrice) {
          // Trigger alert
          setAlerts(prev =>
            prev.map(a =>
              a.id === alert.id
                ? { ...a, isActive: false, triggeredAt: new Date().toISOString() }
                : a
            )
          );

          toast({
            title: "Price Alert Triggered! 🎉",
            description: `${alert.productName} is now $${newPrice.toFixed(2)} (was $${alert.currentPrice.toFixed(2)})`,
            duration: 10000
          });

          // Add to price history
          setPriceHistory(prev => [...prev, {
            productId: alert.productId,
            price: newPrice,
            date: new Date().toISOString().split('T')[0]
          }]);
        }
      }
    });
  };

  // Check for price alerts every 30 seconds (for demo purposes)
  useEffect(() => {
    const interval = setInterval(checkPriceAlerts, 30000);
    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <PriceTrackingContext.Provider value={{
      alerts,
      priceHistory,
      createAlert,
      removeAlert,
      getProductPriceHistory,
      getActiveAlerts,
      checkPriceAlerts
    }}>
      {children}
    </PriceTrackingContext.Provider>
  );
};

export const usePriceTracking = () => {
  const context = useContext(PriceTrackingContext);
  if (context === undefined) {
    throw new Error('usePriceTracking must be used within a PriceTrackingProvider');
  }
  return context;
};
