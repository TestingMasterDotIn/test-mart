
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md" data-testid="login-form-container">
          <CardHeader>
            <CardTitle data-testid="login-title">Login to TestMart</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="login-form">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  data-testid="email-input"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p 
                    id="email-error" 
                    className="text-sm text-red-600" 
                    data-testid="email-error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    data-testid="password-input"
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    data-testid="toggle-password-visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p 
                    id="password-error" 
                    className="text-sm text-red-600" 
                    data-testid="password-error"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full"
                data-testid="login-submit-button"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Test Login Credentials:</p>
              
              <div className="space-y-3 mb-4">
                <div className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Admin User:</div>
                  <div>Email: admin@test.com</div>
                  <div>Password: admin123</div>
                  <div className="text-gray-500 mt-1">Role: Administrator</div>
                </div>
                
                <div className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Regular Buyer:</div>
                  <div>Email: buyer@test.com</div>
                  <div>Password: buyer123</div>
                  <div className="text-gray-500 mt-1">Role: Customer</div>
                </div>
                
                <div className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded">
                  <div className="font-medium mb-1">Guest User:</div>
                  <div>Email: guest@test.com</div>
                  <div>Password: guest123</div>
                  <div className="text-gray-500 mt-1">Role: Guest</div>
                </div>
                
                <div className="text-xs bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                  <div className="font-medium mb-1 text-red-700 dark:text-red-300">Locked Account:</div>
                  <div>Email: locked@test.com</div>
                  <div>Password: locked123</div>
                  <div className="text-red-500 mt-1">Status: Account Locked</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Quick Login Options:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('admin@test.com');
                    setPassword('admin123');
                  }}
                  data-testid="quick-admin-login"
                >
                  Admin Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('buyer@test.com');
                    setPassword('buyer123');
                  }}
                  data-testid="quick-buyer-login"
                >
                  Buyer Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('guest@test.com');
                    setPassword('guest123');
                  }}
                  data-testid="quick-guest-login"
                >
                  Guest Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmail('locked@test.com');
                    setPassword('locked123');
                  }}
                  data-testid="quick-locked-login"
                >
                  Test Locked
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <Link 
                to="/" 
                className="text-sm text-primary hover:underline"
                data-testid="back-to-home-link"
              >
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
