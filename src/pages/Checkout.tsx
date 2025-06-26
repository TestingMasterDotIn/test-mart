
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, totalPrice, discount, applyCoupon, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [couponCode, setCouponCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    console.log('API Call: Place order', { 
      items, 
      totalPrice: finalPrice, 
      shippingAddress: formData 
    });

    toast({
      title: "Order Placed Successfully!",
      description: `Your order total is $${finalPrice.toFixed(2)}`
    });

    clearCart();
    navigate('/thank-you');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleApplyCoupon = () => {
    applyCoupon(couponCode);
    setCouponCode('');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const finalPrice = totalPrice * (1 - discount);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8" data-testid="checkout-title">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card data-testid="shipping-form">
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        data-testid="first-name-input"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-600" data-testid="first-name-error">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        data-testid="last-name-input"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-600" data-testid="last-name-error">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      data-testid="email-input"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600" data-testid="email-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      data-testid="phone-input"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-600" data-testid="phone-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      data-testid="address-input"
                    />
                    {errors.address && (
                      <p className="text-sm text-red-600" data-testid="address-error">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        data-testid="city-input"
                      />
                      {errors.city && (
                        <p className="text-sm text-red-600" data-testid="city-error">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger data-testid="state-select">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA" data-testid="state-ca">California</SelectItem>
                          <SelectItem value="NY" data-testid="state-ny">New York</SelectItem>
                          <SelectItem value="TX" data-testid="state-tx">Texas</SelectItem>
                          <SelectItem value="FL" data-testid="state-fl">Florida</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-sm text-red-600" data-testid="state-error">
                          {errors.state}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      data-testid="zip-input"
                    />
                    {errors.zipCode && (
                      <p className="text-sm text-red-600" data-testid="zip-error">
                        {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg" data-testid="place-order-button">
                    Place Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card data-testid="order-summary">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center" data-testid={`order-item-${item.id}`}>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span data-testid="checkout-subtotal">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({(discount * 100)}%):</span>
                      <span data-testid="checkout-discount">-${(totalPrice * discount).toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span data-testid="checkout-total">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="coupon-section">
              <CardHeader>
                <CardTitle>Apply Coupon</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      data-testid="coupon-input"
                    />
                    <Button onClick={handleApplyCoupon} data-testid="apply-coupon-button">
                      Apply
                    </Button>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 text-sm">Available Coupon Codes:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                        <div>
                          <code className="font-mono font-semibold text-green-700 dark:text-green-300">SAVE10</code>
                          <span className="text-green-600 dark:text-green-400 ml-2">- 10% Off</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setCouponCode('SAVE10');
                            applyCoupon('SAVE10');
                          }}
                          className="text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                        <div>
                          <code className="font-mono font-semibold text-blue-700 dark:text-blue-300">WELCOME20</code>
                          <span className="text-blue-600 dark:text-blue-400 ml-2">- 20% Off</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setCouponCode('WELCOME20');
                            applyCoupon('WELCOME20');
                          }}
                          className="text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">
                        <div>
                          <code className="font-mono font-semibold text-purple-700 dark:text-purple-300">TEST50</code>
                          <span className="text-purple-600 dark:text-purple-400 ml-2">- 50% Off</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setCouponCode('TEST50');
                            applyCoupon('TEST50');
                          }}
                          className="text-xs"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                      💡 Click "Apply" next to any coupon code to use it instantly!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
