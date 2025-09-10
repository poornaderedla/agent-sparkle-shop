import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, Package, Heart, Settings, Edit, Save, X, Eye, EyeOff, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { authAPI, orderAPI } from '@/lib/api';
import type { Order } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Load user data and orders
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('authToken');
      if (token) {
        // Load user profile
        const userResponse = await authAPI.getMe();
        if (userResponse.data.data?.user) {
          setUserProfile({
            firstName: userResponse.data.data.user.firstName || '',
            lastName: userResponse.data.data.user.lastName || '',
            email: userResponse.data.data.user.email || '',
            phone: userResponse.data.data.user.phone || '',
            dateOfBirth: userResponse.data.data.user.dateOfBirth || '',
            address: userResponse.data.data.user.address || {
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'United States'
            },
            preferences: userResponse.data.data.user.preferences || {
              newsletter: true,
              smsNotifications: false,
              emailNotifications: true
            }
          });
        }
        // Load order history
        const ordersResponse = await orderAPI.getAll();
        const orders = Array.isArray(ordersResponse.data) ? ordersResponse.data : [];
        setOrderHistory(orders);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth and account creation mode
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const mode = searchParams.get('mode');

    if (mode === 'create') {
      setIsCreatingAccount(true);
      setIsNewUser(true);
      setIsEditing(true);
      return;
    }

    if (!token) {
      const next = encodeURIComponent('/profile');
      navigate(`/admin/login?next=${next}`);
      return;
    }

    // Load user data if authenticated
    loadUserData();
  }, [searchParams]);

  // User profile data
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    preferences: {
      newsletter: true,
      smsNotifications: false,
      emailNotifications: true
    }
  });

  // Account creation form state
  const [accountForm, setAccountForm] = useState({
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // State for dynamic data
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateAccount = async () => {
    // Validate required fields
    if (!userProfile.firstName || !userProfile.lastName || !userProfile.email || !accountForm.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (accountForm.password !== accountForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (!accountForm.agreeToTerms) {
      toast({
        title: "Terms Not Accepted",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Create account with backend API
      const registrationData = {
        email: userProfile.email,
        password: accountForm.password,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone,
        dateOfBirth: userProfile.dateOfBirth,
        address: userProfile.address,
        preferences: userProfile.preferences,
        role: 'customer'
      };

      const response = await authAPI.register(registrationData);
      const { token, user } = response.data.data;
      
      // Store token and user data
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      updateUser(user);
      
      setIsCreatingAccount(false);
      setIsNewUser(false);
      setIsEditing(false);
      
      toast({
        title: "Account Created Successfully! 🎉",
        description: "Welcome to Sparkle Shop! Your account has been created.",
      });

      // Navigate to home after successful signup
      navigate('/');
    } catch (error: any) {
      console.error('Error creating account:', error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      const resp = await authAPI.updateProfile(userProfile);
      if (resp.data.data?.user) {
        updateUser(resp.data.data.user);
      }
      setIsEditing(false);
      toast({
        title: "Profile Updated! ✅",
        description: "Your profile information has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      if (error?.response?.status === 401) {
        const next = encodeURIComponent('/profile');
        navigate(`/admin/login?next=${next}`);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    toast({
      title: "Changes Cancelled",
      description: "Your profile information remains unchanged.",
    });
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    toast({
      title: "Logged Out Successfully! 👋",
      description: "You have been logged out of your account.",
    });
    
    // Navigate to home page
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={0} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {isCreatingAccount ? 'Create Your Account' : 'My Profile'}
              </h1>
              <p className="text-muted-foreground">
                {isCreatingAccount 
                  ? 'Fill in your information to create your Sparkle Shop account'
                  : 'Manage your account information, orders, and preferences'
                }
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {!isCreatingAccount && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </motion.div>
              )}
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>

          {/* Profile Tab */}
          (
            <TabsContent value="profile">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="card-elegant">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <div className="flex space-x-2">
                        {isEditing ? (
                          <>
                            <Button size="sm" onClick={handleSaveProfile} className="btn-hero">
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userProfile.firstName}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userProfile.lastName}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={userProfile.dateOfBirth}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  {/* Account Creation Fields (only when creating) */}
                  {isCreatingAccount && (
                    <>
                      <Separator className="my-6" />
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={accountForm.password}
                                onChange={(e) => setAccountForm(prev => ({ ...prev, password: e.target.value }))}
                                placeholder="Enter your password"
                                required
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={accountForm.confirmPassword}
                              onChange={(e) => setAccountForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Confirm your password"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hide extra separator when creating account to keep spacing consistent */}
                  {!isCreatingAccount && <Separator className="my-6" />}

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={userProfile.address.street}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, street: e.target.value }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={userProfile.address.city}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, city: e.target.value }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={userProfile.address.state}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, state: e.target.value }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={userProfile.address.zipCode}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, zipCode: e.target.value }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={userProfile.address.country}
                          onChange={(e) => setUserProfile(prev => ({ 
                            ...prev, 
                            address: { ...prev.address, country: e.target.value }
                          }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms and Conditions for Account Creation */}
                  {isCreatingAccount && (
                    <>
                      <Separator className="my-6" />
                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          checked={accountForm.agreeToTerms}
                          onChange={(e) => setAccountForm(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                          className="mt-1"
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm">
                          I agree to the{' '}
                          <Button variant="link" className="p-0 h-auto text-primary">
                            Terms and Conditions
                          </Button>
                          {' '}and{' '}
                          <Button variant="link" className="p-0 h-auto text-primary">
                            Privacy Policy
                          </Button>
                        </Label>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Order History</h2>
                <Badge variant="secondary">{Array.isArray(orderHistory) ? orderHistory.length : 0} Orders</Badge>
              </div>

              {Array.isArray(orderHistory) && orderHistory.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-elegant">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-bold mt-2">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-4">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end mt-4 space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Wishlist</h2>
                <Badge variant="secondary">{wishlist.length} Items</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="card-elegant group">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <h3 className="font-semibold line-clamp-1">{item.name}</h3>
                          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">
                            Added on {new Date(item.addedDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" className="flex-1 btn-hero">
                            Add to Cart
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Email Newsletter</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new products and special offers
                        </p>
                      </div>
                      <Button
                        variant={userProfile.preferences.newsletter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUserProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, newsletter: !prev.preferences.newsletter }
                        }))}
                      >
                        {userProfile.preferences.newsletter ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Get text messages about order updates and promotions
                        </p>
                      </div>
                      <Button
                        variant={userProfile.preferences.smsNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUserProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, smsNotifications: !prev.preferences.smsNotifications }
                        }))}
                      >
                        {userProfile.preferences.smsNotifications ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive email notifications for order status updates
                        </p>
                      </div>
                      <Button
                        variant={userProfile.preferences.emailNotifications ? "default" : "outline"}
                        size="sm"
                        onClick={() => setUserProfile(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, emailNotifications: !prev.preferences.emailNotifications }
                        }))}
                      >
                        {userProfile.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elegant mt-6">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <Button className="btn-hero">
                      Update Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Logout Section */}
              <Card className="card-elegant mt-6">
                <CardHeader>
                  <CardTitle className="text-destructive">Account Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Sign Out</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Sign out of your account on this device. You'll need to sign in again to access your profile.
                      </p>
                      <Button
                        variant="destructive"
                        onClick={handleLogout}
                        className="w-full sm:w-auto"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
