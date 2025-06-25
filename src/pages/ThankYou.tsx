
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

const ThankYou = () => {
  const orderNumber = `TM${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" data-testid="success-icon" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="thank-you-title">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-gray-600" data-testid="order-confirmation">
            Your order has been successfully placed and is being processed.
          </p>
        </div>

        <Card className="mb-8" data-testid="order-details">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Order Details
            </CardTitle>
            <CardDescription>
              Keep this information for your records
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900">Order Number</h4>
                <p className="text-lg font-mono" data-testid="order-number">{orderNumber}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Order Date</h4>
                <p data-testid="order-date">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>You'll receive an email confirmation shortly</li>
                <li>We'll notify you when your order ships</li>
                <li>Track your order in your dashboard</li>
                <li>Expected delivery: 3-5 business days</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-blue-700 text-sm">
                Contact our customer service team at support@testmart.com or call 1-800-TEST-MART
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="action-buttons">
          <Link to="/" className="block">
            <Button variant="outline" className="w-full" data-testid="home-button">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/products" className="block">
            <Button variant="outline" className="w-full" data-testid="continue-shopping-button">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          
          <Link to="/dashboard" className="block">
            <Button className="w-full" data-testid="view-orders-button">
              <Package className="h-4 w-4 mr-2" />
              View My Orders
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-500" data-testid="footer-message">
          <p>This is a test e-commerce application for automation testing purposes.</p>
          <p className="mt-2">No real orders were placed or payments processed.</p>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;
