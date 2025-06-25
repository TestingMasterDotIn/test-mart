
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { ShoppingBag, Users, Shield, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16" data-testid="hero-section">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to TestMart
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your Complete E-commerce Testing Platform
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products">
              <Button size="lg" data-testid="shop-now-button">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" data-testid="login-cta-button">
                Login to Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Test Credentials Section */}
        <Card className="mb-12" data-testid="test-credentials-section">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Test Login Credentials
            </CardTitle>
            <CardDescription>
              Use these credentials to test different authentication scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-50 rounded-lg" data-testid="valid-admin-creds">
                <Badge className="mb-2 bg-green-100 text-green-800">Valid - Admin</Badge>
                <p className="text-sm font-mono">admin@test.com</p>
                <p className="text-sm font-mono">admin123</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg" data-testid="valid-buyer-creds">
                <Badge className="mb-2 bg-blue-100 text-blue-800">Valid - Buyer</Badge>
                <p className="text-sm font-mono">buyer@test.com</p>
                <p className="text-sm font-mono">buyer123</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg" data-testid="valid-guest-creds">
                <Badge className="mb-2 bg-gray-100 text-gray-800">Valid - Guest</Badge>
                <p className="text-sm font-mono">guest@test.com</p>
                <p className="text-sm font-mono">guest123</p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg" data-testid="locked-user-creds">
                <Badge className="mb-2 bg-red-100 text-red-800">Locked User</Badge>
                <p className="text-sm font-mono">locked@test.com</p>
                <p className="text-sm font-mono">locked123</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg" data-testid="invalid-creds">
              <Badge className="mb-2 bg-yellow-100 text-yellow-800">Invalid Credentials</Badge>
              <p className="text-sm">Try: wrong@test.com / wrongpass</p>
            </div>
          </CardContent>
        </Card>

        {/* Coupon Codes Section */}
        <Card className="mb-12" data-testid="coupon-codes-section">
          <CardHeader>
            <CardTitle>Test Coupon Codes</CardTitle>
            <CardDescription>
              Use these codes during checkout to test coupon functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg text-center" data-testid="coupon-save10">
                <p className="font-mono font-bold text-lg">SAVE10</p>
                <p className="text-sm text-gray-600">10% Discount</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center" data-testid="coupon-welcome20">
                <p className="font-mono font-bold text-lg">WELCOME20</p>
                <p className="text-sm text-gray-600">20% Discount</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg text-center" data-testid="coupon-test50">
                <p className="font-mono font-bold text-lg">TEST50</p>
                <p className="text-sm text-gray-600">50% Discount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-testid="features-section">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Role-Based Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Test different user roles: Admin, Buyer, and Guest with varying permissions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Complete E-commerce Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                From product browsing to checkout completion with cart persistence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5" />
                Test-Friendly Design
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Built with automation testing in mind using proper data attributes and semantic HTML.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
