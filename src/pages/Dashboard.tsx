
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { User, ShoppingBag, Package, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleClearData = () => {
    clearCart();
    localStorage.clear();
    logout();
    navigate('/');
  };

  const mockOrders = [
    { id: '1', date: '2024-01-15', total: 89.99, status: 'delivered', items: 3 },
    { id: '2', date: '2024-01-10', total: 156.50, status: 'shipped', items: 2 },
    { id: '3', date: '2024-01-05', total: 42.25, status: 'processing', items: 1 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900" data-testid="dashboard-title">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2" data-testid="user-role">
            Role: <Badge variant="secondary">{user.role}</Badge>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card data-testid="profile-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="user-email">{user.email}</div>
              <p className="text-xs text-muted-foreground">
                Account verified
              </p>
            </CardContent>
          </Card>

          <Card data-testid="orders-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="total-orders">{mockOrders.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card data-testid="spending-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="total-spent">
                ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Since joining
              </p>
            </CardContent>
          </Card>

          <Card data-testid="actions-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleClearData}
                data-testid="clear-data-button"
              >
                Clear App Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="recent-orders">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your recent purchase history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.map(order => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 border rounded-lg"
                  data-testid={`order-${order.id}`}
                >
                  <div>
                    <p className="font-medium" data-testid={`order-id-${order.id}`}>
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-600" data-testid={`order-date-${order.id}`}>
                      {order.date} • {order.items} items
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={getStatusColor(order.status)}
                      data-testid={`order-status-${order.id}`}
                    >
                      {order.status}
                    </Badge>
                    <span className="font-bold" data-testid={`order-total-${order.id}`}>
                      ${order.total}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {user.role === 'admin' && (
          <Card className="mt-8" data-testid="admin-panel">
            <CardHeader>
              <CardTitle>Admin Panel</CardTitle>
              <CardDescription>
                Administrative functions and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" data-testid="manage-users">
                  Manage Users
                </Button>
                <Button variant="outline" data-testid="manage-products">
                  Manage Products
                </Button>
                <Button variant="outline" data-testid="view-reports">
                  View Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
