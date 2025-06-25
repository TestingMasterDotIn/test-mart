import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { CheckCircle, XCircle, AlertTriangle, User, ShoppingCart, CreditCard, Package, Monitor } from 'lucide-react';

const TestCases = () => {
  const testScenarios = {
    authentication: [
      {
        id: 'AUTH_001',
        type: 'positive',
        title: 'Valid Admin Login',
        steps: [
          'Navigate to /login',
          'Enter email: admin@test.com',
          'Enter password: admin123',
          'Click Login button'
        ],
        expected: 'User should be logged in and redirected to dashboard',
        testData: 'admin@test.com / admin123'
      },
      {
        id: 'AUTH_002',
        type: 'positive',
        title: 'Valid Buyer Login',
        steps: [
          'Navigate to /login',
          'Enter email: buyer@test.com',
          'Enter password: buyer123',
          'Click Login button'
        ],
        expected: 'User should be logged in and redirected to dashboard',
        testData: 'buyer@test.com / buyer123'
      },
      {
        id: 'AUTH_003',
        type: 'negative',
        title: 'Invalid Email Format',
        steps: [
          'Navigate to /login',
          'Enter email: invalid-email',
          'Enter password: any123',
          'Click Login button'
        ],
        expected: 'Error message: "Please enter a valid email"',
        testData: 'invalid-email / any123'
      },
      {
        id: 'AUTH_004',
        type: 'negative',
        title: 'Wrong Password',
        steps: [
          'Navigate to /login',
          'Enter email: buyer@test.com',
          'Enter password: wrongpass',
          'Click Login button'
        ],
        expected: 'Error toast: "Incorrect password"',
        testData: 'buyer@test.com / wrongpass'
      },
      {
        id: 'AUTH_005',
        type: 'negative',
        title: 'Non-existent User',
        steps: [
          'Navigate to /login',
          'Enter email: nonexistent@test.com',
          'Enter password: any123',
          'Click Login button'
        ],
        expected: 'Error toast: "User not found"',
        testData: 'nonexistent@test.com / any123'
      },
      {
        id: 'AUTH_006',
        type: 'edge',
        title: 'Locked Account',
        steps: [
          'Navigate to /login',
          'Enter email: locked@test.com',
          'Enter password: locked123',
          'Click Login button'
        ],
        expected: 'Error toast: "Your account has been locked"',
        testData: 'locked@test.com / locked123'
      },
      {
        id: 'AUTH_007',
        type: 'edge',
        title: 'Password Too Short',
        steps: [
          'Navigate to /login',
          'Enter email: buyer@test.com',
          'Enter password: 123',
          'Click Login button'
        ],
        expected: 'Error message: "Password must be at least 6 characters"',
        testData: 'buyer@test.com / 123'
      },
      {
        id: 'AUTH_008',
        type: 'edge',
        title: 'Empty Fields',
        steps: [
          'Navigate to /login',
          'Leave email field empty',
          'Leave password field empty',
          'Click Login button'
        ],
        expected: 'Error messages for both required fields',
        testData: 'empty / empty'
      }
    ],
    products: [
      {
        id: 'PROD_001',
        type: 'positive',
        title: 'View All Products',
        steps: [
          'Navigate to /products',
          'Verify products grid is displayed'
        ],
        expected: 'All 14 products should be visible with images, names, prices',
        testData: 'N/A'
      },
      {
        id: 'PROD_002',
        type: 'positive',
        title: 'Search Products',
        steps: [
          'Navigate to /products',
          'Enter "laptop" in search box',
          'Verify filtered results'
        ],
        expected: 'Only products containing "laptop" should be shown',
        testData: 'Search: "laptop"'
      },
      {
        id: 'PROD_003',
        type: 'positive',
        title: 'Filter by Category',
        steps: [
          'Navigate to /products',
          'Select "Electronics" from category filter',
          'Verify filtered results'
        ],
        expected: 'Only Electronics products should be displayed',
        testData: 'Category: Electronics'
      },
      {
        id: 'PROD_004',
        type: 'positive',
        title: 'Sort by Price Low to High',
        steps: [
          'Navigate to /products',
          'Select "Price (Low to High)" from sort dropdown',
          'Verify product order'
        ],
        expected: 'Products should be sorted by ascending price',
        testData: 'Sort: Price (Low to High)'
      },
      {
        id: 'PROD_005',
        type: 'negative',
        title: 'Search No Results',
        steps: [
          'Navigate to /products',
          'Enter "nonexistentproduct" in search box',
          'Verify no results message'
        ],
        expected: 'Message: "No products found matching your criteria"',
        testData: 'Search: "nonexistentproduct"'
      },
      {
        id: 'PROD_006',
        type: 'edge',
        title: 'Search Special Characters',
        steps: [
          'Navigate to /products',
          'Enter "!@#$%^&*()" in search box',
          'Verify behavior'
        ],
        expected: 'No results message should appear gracefully',
        testData: 'Search: "!@#$%^&*()"'
      }
    ],
    specialProducts: [
      {
        id: 'SPECIAL_001',
        type: 'positive',
        title: 'Iframe Product Display',
        steps: [
          'Navigate to /products',
          'Locate "Interactive iframe Widget" product (ID: 13)',
          'Verify iframe content loads',
          'Check iframe has proper testid attribute'
        ],
        expected: 'Iframe displays with colored background, text, and interactive button',
        testData: 'Product ID: 13'
      },
      {
        id: 'SPECIAL_002',
        type: 'positive',
        title: 'Iframe Button Interaction',
        steps: [
          'Navigate to /products',
          'Find "Interactive iframe Widget" product',
          'Click button inside iframe',
          'Verify alert appears'
        ],
        expected: 'Alert shows "Button clicked in iframe!"',
        testData: 'iframe-content-13'
      },
      {
        id: 'SPECIAL_003',
        type: 'positive',
        title: 'Shadow DOM Product Display',
        steps: [
          'Navigate to /products',
          'Locate "Shadow DOM Component" product (ID: 14)',
          'Verify shadow DOM content renders',
          'Check shadow host has proper testid'
        ],
        expected: 'Shadow DOM content displays with gradient background and encapsulated styles',
        testData: 'Product ID: 14'
      },
      {
        id: 'SPECIAL_004',
        type: 'positive',
        title: 'Shadow DOM Button Interaction',
        steps: [
          'Navigate to /products',
          'Find "Shadow DOM Component" product',
          'Click button inside shadow DOM',
          'Verify alert appears'
        ],
        expected: 'Alert shows "Button clicked in Shadow DOM!"',
        testData: 'shadow-button-14'
      },
      {
        id: 'SPECIAL_005',
        type: 'positive',
        title: 'Special Product Badges',
        steps: [
          'Navigate to /products',
          'Locate iframe and shadow DOM products',
          'Verify special badges are displayed',
          'Check badge text shows correct type'
        ],
        expected: 'iframe product shows "IFRAME" badge, shadow DOM shows "SHADOWDOM" badge',
        testData: 'special-badge-13, special-badge-14'
      },
      {
        id: 'SPECIAL_006',
        type: 'edge',
        title: 'Special Products in Cart',
        steps: [
          'Add iframe product to cart',
          'Add shadow DOM product to cart',
          'Navigate to /cart',
          'Verify products display correctly'
        ],
        expected: 'Special products should appear in cart without special content, only basic product info',
        testData: 'Cart with special products'
      },
      {
        id: 'SPECIAL_007',
        type: 'edge',
        title: 'Special Product Details View',
        steps: [
          'Navigate to /products',
          'Click "View Details" on iframe product',
          'Verify product details page',
          'Check if special content renders'
        ],
        expected: 'Product details page should display with special content if implemented',
        testData: 'Product details for ID: 13'
      },
      {
        id: 'SPECIAL_008',
        type: 'negative',
        title: 'Special Content Accessibility',
        steps: [
          'Navigate to /products using screen reader',
          'Test iframe and shadow DOM products',
          'Verify accessible content'
        ],
        expected: 'Special content should have proper accessibility attributes and fallbacks',
        testData: 'Accessibility testing'
      }
    ],
    cart: [
      {
        id: 'CART_001',
        type: 'positive',
        title: 'Add Product to Cart',
        steps: [
          'Navigate to /products',
          'Click "Add to Cart" on any in-stock product',
          'Verify toast notification',
          'Check cart badge updates'
        ],
        expected: 'Success toast shown, cart badge shows "1"',
        testData: 'Any in-stock product'
      },
      {
        id: 'CART_002',
        type: 'positive',
        title: 'Update Quantity',
        steps: [
          'Add product to cart',
          'Navigate to /cart',
          'Click "+" button to increase quantity',
          'Verify quantity and total updates'
        ],
        expected: 'Quantity increases, total price updates correctly',
        testData: 'Any product in cart'
      },
      {
        id: 'CART_003',
        type: 'positive',
        title: 'Remove Item from Cart',
        steps: [
          'Add product to cart',
          'Navigate to /cart',
          'Click trash icon to remove item',
          'Verify item removal'
        ],
        expected: 'Item removed, cart updates, success toast shown',
        testData: 'Any product in cart'
      },
      {
        id: 'CART_004',
        type: 'negative',
        title: 'Add Out of Stock Product',
        steps: [
          'Navigate to /products',
          'Find out-of-stock product',
          'Attempt to click "Add to Cart"'
        ],
        expected: 'Button should be disabled, no action possible',
        testData: 'Out of stock product'
      },
      {
        id: 'CART_005',
        type: 'edge',
        title: 'Cart Persistence',
        steps: [
          'Add products to cart',
          'Refresh page',
          'Navigate to /cart',
          'Verify cart contents'
        ],
        expected: 'Cart contents should persist after page refresh',
        testData: 'Multiple products'
      },
      {
        id: 'CART_006',
        type: 'edge',
        title: 'Empty Cart State',
        steps: [
          'Ensure cart is empty',
          'Navigate to /cart',
          'Verify empty state'
        ],
        expected: 'Empty cart message and "Continue Shopping" button shown',
        testData: 'Empty cart'
      }
    ],
    checkout: [
      {
        id: 'CHECK_001',
        type: 'positive',
        title: 'Valid Coupon Application',
        steps: [
          'Add products to cart',
          'Navigate to /checkout',
          'Enter coupon code "SAVE10"',
          'Click Apply Coupon'
        ],
        expected: '10% discount applied, total updated, success toast shown',
        testData: 'Coupon: SAVE10'
      },
      {
        id: 'CHECK_002',
        type: 'positive',
        title: 'Complete Checkout Flow',
        steps: [
          'Fill all required fields in checkout form',
          'Submit payment information',
          'Complete order',
          'Verify redirect to thank you page'
        ],
        expected: 'Order successful, redirected to /thank-you with order number',
        testData: 'Valid form data'
      },
      {
        id: 'CHECK_003',
        type: 'negative',
        title: 'Invalid Coupon Code',
        steps: [
          'Navigate to /checkout',
          'Enter invalid coupon "INVALID"',
          'Click Apply Coupon'
        ],
        expected: 'Error toast: "The coupon code you entered is not valid"',
        testData: 'Coupon: INVALID'
      },
      {
        id: 'CHECK_004',
        type: 'negative',
        title: 'Incomplete Form Submission',
        steps: [
          'Navigate to /checkout',
          'Leave required fields empty',
          'Attempt to submit form'
        ],
        expected: 'Validation errors shown for required fields',
        testData: 'Empty required fields'
      },
      {
        id: 'CHECK_005',
        type: 'edge',
        title: 'Maximum Coupon Discount',
        steps: [
          'Add products to cart',
          'Navigate to /checkout',
          'Apply coupon "TEST50" for 50% discount',
          'Verify calculation'
        ],
        expected: '50% discount applied correctly, final total calculated',
        testData: 'Coupon: TEST50'
      }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'edge':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      positive: 'bg-green-100 text-green-800',
      negative: 'bg-red-100 text-red-800',
      edge: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <Badge className={variants[type as keyof typeof variants]} data-testid={`badge-${type}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4" data-testid="test-cases-title">
            UI Test Cases - TestMart E-Commerce
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Comprehensive test scenarios covering positive, negative, and edge cases for the entire user journey.
          </p>
        </div>

        <Tabs defaultValue="authentication" className="space-y-6" data-testid="test-cases-tabs">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="authentication" className="flex items-center" data-testid="auth-tab">
              <User className="h-4 w-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center" data-testid="products-tab">
              <Package className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="specialProducts" className="flex items-center" data-testid="special-products-tab">
              <Monitor className="h-4 w-4 mr-2" />
              Special Products
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex items-center" data-testid="cart-tab">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shopping Cart
            </TabsTrigger>
            <TabsTrigger value="checkout" className="flex items-center" data-testid="checkout-tab">
              <CreditCard className="h-4 w-4 mr-2" />
              Checkout
            </TabsTrigger>
          </TabsList>

          {Object.entries(testScenarios).map(([category, scenarios]) => (
            <TabsContent key={category} value={category} className="space-y-4" data-testid={`${category}-content`}>
              <div className="grid gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700" data-testid={`test-case-${scenario.id}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2 dark:text-white">
                          {getTypeIcon(scenario.type)}
                          <span data-testid={`test-title-${scenario.id}`}>{scenario.id}: {scenario.title}</span>
                        </CardTitle>
                        {getTypeBadge(scenario.type)}
                      </div>
                      <CardDescription data-testid={`test-data-${scenario.id}`} className="dark:text-gray-400">
                        Test Data: {scenario.testData}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">Test Steps:</h4>
                          <ol className="list-decimal list-inside space-y-1 text-sm dark:text-gray-300">
                            {scenario.steps.map((step, index) => (
                              <li key={index} data-testid={`step-${scenario.id}-${index}`}>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 dark:text-white">Expected Result:</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400" data-testid={`expected-${scenario.id}`}>
                            {scenario.expected}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mt-8 dark:bg-gray-800 dark:border-gray-700" data-testid="test-credentials">
          <CardHeader>
            <CardTitle className="dark:text-white">Test Credentials & Data</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Use these credentials and test data for manual and automated testing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 dark:text-white">Login Credentials:</h4>
                <div className="space-y-2 text-sm dark:text-gray-300">
                  <div><strong>Admin:</strong> admin@test.com / admin123</div>
                  <div><strong>Buyer:</strong> buyer@test.com / buyer123</div>
                  <div><strong>Guest:</strong> guest@test.com / guest123</div>
                  <div><strong>Locked:</strong> locked@test.com / locked123</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3 dark:text-white">Valid Coupon Codes:</h4>
                <div className="space-y-2 text-sm dark:text-gray-300">
                  <div><strong>SAVE10:</strong> 10% discount</div>
                  <div><strong>WELCOME20:</strong> 20% discount</div>
                  <div><strong>TEST50:</strong> 50% discount</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3 dark:text-white">Special Products:</h4>
              <div className="space-y-2 text-sm dark:text-gray-300">
                <div><strong>ID 13:</strong> Interactive iframe Widget (iframe content)</div>
                <div><strong>ID 14:</strong> Shadow DOM Component (shadow DOM content)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TestCases;
