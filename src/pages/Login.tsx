
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
            <br></br>
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


            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-semibold">Test Login Credentials:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              
              <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg" data-testid="invalid-creds">
                <Badge className="mb-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Invalid Credentials</Badge>
                <p className="text-sm font-mono">Try: wrong@test.com / wrongpass</p>
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
