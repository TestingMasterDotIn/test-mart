import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewContextType {
  reviews: Review[];
  getProductReviews: (productId: string) => Review[];
  addReview: (review: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'helpful'>) => void;
  markHelpful: (reviewId: string) => void;
  getAverageRating: (productId: string) => number;
  getRatingDistribution: (productId: string) => Record<number, number>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '2',
    userName: 'John Buyer',
    rating: 5,
    title: 'Excellent headphones!',
    comment: 'The sound quality is amazing and the noise cancellation works perfectly. Highly recommended!',
    date: '2024-01-15',
    verified: true,
    helpful: 12,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100']
  },
  {
    id: '2',
    productId: '1',
    userId: '3',
    userName: 'Guest User',
    rating: 4,
    title: 'Good but expensive',
    comment: 'Great quality but a bit pricey. The battery life could be better.',
    date: '2024-01-10',
    verified: false,
    helpful: 8
  },
  {
    id: '3',
    productId: '2',
    userId: '2',
    userName: 'John Buyer',
    rating: 5,
    title: 'Perfect fitness companion',
    comment: 'Tracks everything I need and the battery lasts for days. Love the health monitoring features.',
    date: '2024-01-20',
    verified: true,
    helpful: 15
  }
];

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const savedReviews = localStorage.getItem('product_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const getProductReviews = (productId: string) => {
    return reviews
      .filter(review => review.productId === productId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'userId' | 'userName' | 'date' | 'helpful'>) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "You must be logged in to write a review.",
        variant: "destructive"
      });
      return;
    }

    // Check if user already reviewed this product
    const existingReview = reviews.find(
      review => review.productId === reviewData.productId && review.userId === user.id
    );

    if (existingReview) {
      toast({
        title: "Review Already Exists",
        description: "You have already reviewed this product.",
        variant: "destructive"
      });
      return;
    }

    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);
    toast({
      title: "Review Added",
      description: "Thank you for your review!"
    });
  };

  const markHelpful = (reviewId: string) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
    toast({
      title: "Thank you!",
      description: "Your feedback has been recorded."
    });
  };

  const getAverageRating = (productId: string) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / productReviews.length) * 10) / 10;
  };

  const getRatingDistribution = (productId: string) => {
    const productReviews = getProductReviews(productId);
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    productReviews.forEach(review => {
      distribution[review.rating]++;
    });
    
    return distribution;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      getProductReviews,
      addReview,
      markHelpful,
      getAverageRating,
      getRatingDistribution
    }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
