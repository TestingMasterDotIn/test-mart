
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'buyer' | 'guest';
  isLocked?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for testing
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@test.com': {
    password: 'admin123',
    user: { id: '1', email: 'admin@test.com', name: 'Admin User', role: 'admin' }
  },
  'buyer@test.com': {
    password: 'buyer123',
    user: { id: '2', email: 'buyer@test.com', name: 'John Buyer', role: 'buyer' }
  },
  'guest@test.com': {
    password: 'guest123',
    user: { id: '3', email: 'guest@test.com', name: 'Guest User', role: 'guest' }
  },
  'locked@test.com': {
    password: 'locked123',
    user: { id: '4', email: 'locked@test.com', name: 'Locked User', role: 'buyer', isLocked: true }
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    console.log('API Call: Login attempt', { email, password: '***' });
    
    const userRecord = mockUsers[email];
    
    if (!userRecord) {
      toast({
        title: "Invalid Credentials",
        description: "User not found",
        variant: "destructive"
      });
      return false;
    }

    if (userRecord.password !== password) {
      toast({
        title: "Invalid Credentials", 
        description: "Incorrect password",
        variant: "destructive"
      });
      return false;
    }

    if (userRecord.user.isLocked) {
      toast({
        title: "Account Locked",
        description: "Your account has been locked. Please contact support.",
        variant: "destructive"
      });
      return false;
    }

    setUser(userRecord.user);
    localStorage.setItem('auth_user', JSON.stringify(userRecord.user));
    localStorage.setItem('auth_token', `token_${userRecord.user.id}`);
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${userRecord.user.name}!`
    });

    console.log('API Response: Login successful', { user: userRecord.user });
    return true;
  };

  const logout = () => {
    console.log('API Call: Logout');
    setUser(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
