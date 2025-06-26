
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { ShoppingBag, Users, Shield, Star, Globe, ExternalLink, BookOpen, Code, TestTube, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16" data-testid="hero-section" data-lov-id="src\pages\Index.tsx:14:6">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to TestMart
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
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
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg" data-testid="valid-admin-creds">
                <Badge className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Valid - Admin</Badge>
                <p className="text-sm font-mono">admin@test.com</p>
                <p className="text-sm font-mono">admin123</p>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg" data-testid="valid-buyer-creds">
                <Badge className="mb-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Valid - Buyer</Badge>
                <p className="text-sm font-mono">buyer@test.com</p>
                <p className="text-sm font-mono">buyer123</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg" data-testid="valid-guest-creds">
                <Badge className="mb-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Valid - Guest</Badge>
                <p className="text-sm font-mono">guest@test.com</p>
                <p className="text-sm font-mono">guest123</p>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg" data-testid="locked-user-creds">
                <Badge className="mb-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Locked User</Badge>
                <p className="text-sm font-mono">locked@test.com</p>
                <p className="text-sm font-mono">locked123</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg" data-testid="invalid-creds">
              <Badge className="mb-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Invalid Credentials</Badge>
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
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center" data-testid="coupon-save10">
                <p className="font-mono font-bold text-lg">SAVE10</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">10% Discount</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-center" data-testid="coupon-welcome20">
                <p className="font-mono font-bold text-lg">WELCOME20</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">20% Discount</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg text-center" data-testid="coupon-test50">
                <p className="font-mono font-bold text-lg">TEST50</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">50% Discount</p>
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
              <p className="text-muted-foreground">
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
              <p className="text-muted-foreground">
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
              <p className="text-muted-foreground">
                Built with automation testing in mind using proper data attributes and semantic HTML.
              </p>
            </CardContent>
          </Card>
        </div>

                {/* About TestingMaster.in Section */}
        <div className="mb-16" data-testid="testingmaster-intro-section">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center text-2xl">
                <Globe className="mr-3 h-6 w-6 text-blue-600" />
                About TestingMaster.in
              </CardTitle>
              <CardDescription className="text-lg">
                Discover the main blog that powers this testing platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>TestingMaster.in</strong> is a comprehensive blog dedicated to software testing, 
                    automation, and quality assurance. This TestMart application is one of the practical 
                    testing platforms available in the TestingMaster.in Apps section.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">Testing Tutorials</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Automation Guides</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TestTube className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Practice Apps</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-orange-600" />
                      <span className="text-sm">Latest Tools</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <a
                      href="https://testingmaster.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="visit-testingmaster-button"
                    >
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Globe className="mr-2 h-4 w-4" />
                        Visit TestingMaster.in
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href="https://testingmaster.in/learning-paths"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="explore-learning-paths-button"
                    >
                      <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-300 dark:hover:bg-blue-950">
                        <TestTube className="mr-2 h-4 w-4" />
                        Explore More Learning Paths
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-3 text-center">What You'll Find</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Comprehensive testing tutorials and guides</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Selenium, Playwright, and Cypress automation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Multiple practice applications like TestMart</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>API testing and performance testing content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>Industry best practices and latest tools</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
      </main>


      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-4">
              <p className="text-gray-600 dark:text-gray-400">
                TestMart is part of the 
              </p>
              <a
                href="https://testingmaster.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                data-testid="footer-testingmaster-link"
              >
                <Globe className="h-4 w-4" />
                <span>TestingMaster.in</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <p className="text-gray-600 dark:text-gray-400">
                ecosystem
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Built for testing professionals and automation engineers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
