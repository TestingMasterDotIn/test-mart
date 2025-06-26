import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useComparison } from '@/contexts/ComparisonContext';
import { ShoppingCart, User, LogOut, Search, Home, TestTube, Heart, GitCompare, ExternalLink, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery = '' }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { compareList } = useComparison();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const clearAppData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2" data-testid="home-link">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">TestMart</span>
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              <Link 
                to="/products" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                data-testid="products-nav-link"
              >
                Products
              </Link>
              <Link 
                to="/compare" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center"
                data-testid="compare-nav-link"
              >
                <GitCompare className="h-4 w-4 mr-1" />
                Compare ({compareList.length})
              </Link>
              <Link 
                to="/test-cases" 
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors flex items-center"
                data-testid="test-cases-nav-link"
              >
                <TestTube className="h-4 w-4 mr-1" />
                Test Cases
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                  data-testid="dashboard-nav-link"
                >
                  Dashboard
                </Link>
              )}
              
              {/* TestingMaster.in Link */}
              <a 
                href="https://testingmaster.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors py-1 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all flex items-center text-sm font-medium"
                data-testid="testingmaster-link"
                title="Visit TestingMaster.in - Learn Testing & Automation"
              >
                <Globe className="h-4 w-4 mr-1" />
                TestingMaster.in
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </nav>
          </div>

          {onSearch && (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-10"
                  data-testid="search-input"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile TestingMaster.in Link */}
            <a 
              href="https://testingmaster.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all"
              data-testid="testingmaster-mobile-link"
              title="Visit TestingMaster.in"
            >
              <Globe className="h-4 w-4" />
            </a>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => navigate('/wishlist')}
              data-testid="wishlist-button"
            >
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                  data-testid="wishlist-badge"
                >
                  {wishlist.length}
                </Badge>
              )}
            </Button>
            
            <Link to="/cart" className="relative" data-testid="cart-link">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                    data-testid="cart-badge"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-300" data-testid="user-welcome">
                  Welcome, {user?.name}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" data-testid="login-button">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            <Button 
              variant="destructive" 
              size="sm" 
              onClick={clearAppData}
              data-testid="clear-data-button"
              className="hidden md:block"
            >
              Clear App Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
