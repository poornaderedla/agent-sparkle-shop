import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Users, 
  Package, 
  TrendingUp, 
  ShoppingCart,
  Eye,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import Navbar from '@/components/Navbar';
import type { Analytics } from '@/lib/api';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard = ({ title, value, change, icon: Icon, trend }: MetricCardProps) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="card-elegant card-hover">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className={`text-xs ${trendColors[trend]} flex items-center mt-1`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {change}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeRange, setTimeRange] = useState('7d');

  // Mock analytics data
  useEffect(() => {
    const mockAnalytics: Analytics = {
      totalSales: 125670,
      totalCustomers: 2847,
      totalProducts: 156,
      salesTrend: [
        { date: '2024-01-01', sales: 12000 },
        { date: '2024-01-02', sales: 15000 },
        { date: '2024-01-03', sales: 18000 },
        { date: '2024-01-04', sales: 14000 },
        { date: '2024-01-05', sales: 22000 },
        { date: '2024-01-06', sales: 19000 },
        { date: '2024-01-07', sales: 25000 },
      ],
      topProducts: [
        { 
          product: {
            id: '1',
            name: 'Wireless Headphones Pro',
            description: 'Premium headphones',
            price: 299.99,
            image: '',
            category: 'Electronics',
            stock: 15,
          },
          sales: 85
        },
        { 
          product: {
            id: '2',
            name: 'Smart Fitness Watch',
            description: 'Advanced fitness tracker',
            price: 199.99,
            image: '',
            category: 'Electronics',
            stock: 8,
          },
          sales: 62
        },
      ]
    };
    setAnalytics(mockAnalytics);
  }, []);

  const salesData = [
    { name: 'Mon', sales: 12000, orders: 45 },
    { name: 'Tue', sales: 15000, orders: 52 },
    { name: 'Wed', sales: 18000, orders: 61 },
    { name: 'Thu', sales: 14000, orders: 48 },
    { name: 'Fri', sales: 22000, orders: 73 },
    { name: 'Sat', sales: 19000, orders: 65 },
    { name: 'Sun', sales: 25000, orders: 82 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#10b981' },
    { name: 'Fashion', value: 25, color: '#6366f1' },
    { name: 'Home', value: 20, color: '#f59e0b' },
    { name: 'Lifestyle', value: 10, color: '#ef4444' },
  ];

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$125,670',
      change: '+12.5% from last month',
      icon: DollarSign,
      trend: 'up' as const,
    },
    {
      title: 'Total Customers',
      value: '2,847',
      change: '+8.3% from last month',
      icon: Users,
      trend: 'up' as const,
    },
    {
      title: 'Total Products',
      value: '156',
      change: '+4 new this week',
      icon: Package,
      trend: 'up' as const,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '+0.4% from last month',
      icon: TrendingUp,
      trend: 'up' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isAdmin={true} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store today.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Sales Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Sales by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className="text-sm font-medium">{category.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="card-elegant">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: '#1234', customer: 'John Doe', amount: '$299.99', status: 'completed' },
                  { id: '#1235', customer: 'Jane Smith', amount: '$159.99', status: 'processing' },
                  { id: '#1236', customer: 'Bob Johnson', amount: '$89.99', status: 'shipped' },
                  { id: '#1237', customer: 'Alice Brown', amount: '$449.99', status: 'pending' },
                ].map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{order.amount}</span>
                      <Badge 
                        variant={
                          order.status === 'completed' ? 'default' :
                          order.status === 'processing' ? 'secondary' :
                          order.status === 'shipped' ? 'outline' : 'destructive'
                        }
                      >
                        {order.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;