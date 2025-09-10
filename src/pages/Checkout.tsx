import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, MapPin, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { CartItem } from '@/lib/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: ''
  });

  // Mock cart data
  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        productId: '1',
        quantity: 2,
        product: {
          id: '1',
          name: 'Wireless Headphones Pro',
          description: 'Premium noise-canceling headphones with 30-hour battery life',
          price: 299.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format&q=80',
          category: 'Electronics',
          stock: 15,
          featured: true,
        },
      },
      {
        id: '2',
        productId: '2',
        quantity: 1,
        product: {
          id: '2',
          name: 'Eco-Friendly Water Bottle',
          description: 'Sustainable stainless steel bottle with temperature control',
          price: 45.99,
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop&auto=format&q=80',
          category: 'Lifestyle',
          stock: 32,
          featured: false,
        },
      },
    ];
    setCartItems(mockCartItems);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, title: 'Login', icon: User },
    { id: 2, title: 'Shipping', icon: MapPin },
    { id: 3, title: 'Payment', icon: CreditCard },
    { id: 4, title: 'Review', icon: Lock }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
      setCurrentStep(2);
      toast({
        title: "Login Successful! ✅",
        description: "Welcome back! Please continue with your order.",
      });
    }, 1000);
  };

  const handleShippingNext = () => {
    setCurrentStep(3);
  };

  const handlePaymentNext = () => {
    setCurrentStep(4);
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Simulate order placement
    setTimeout(() => {
      setIsLoading(false);
      navigate('/order-confirmation');
      toast({
        title: "Order Placed Successfully! 🎉",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      });
    }, 2000);
  };

  const handleInputChange = (form: string, field: string, value: string) => {
    switch (form) {
      case 'login':
        setLoginForm(prev => ({ ...prev, [field]: value }));
        break;
      case 'shipping':
        setShippingForm(prev => ({ ...prev, [field]: value }));
        break;
      case 'payment':
        setPaymentForm(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Sign In to Continue</h2>
              <p className="text-muted-foreground">
                Please sign in to your account to proceed with checkout
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button type="submit" className="w-full btn-hero" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In & Continue'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 h-auto">
                  Create one here
                </Button>
              </p>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Shipping Information</h2>
              <p className="text-muted-foreground">
                Where should we deliver your order?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={shippingForm.firstName}
                  onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={shippingForm.lastName}
                  onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={shippingForm.email}
                onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={shippingForm.phone}
                onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={shippingForm.address}
                onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={shippingForm.city}
                  onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                  placeholder="San Francisco"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={shippingForm.state}
                  onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                  placeholder="CA"
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={shippingForm.zipCode}
                  onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                  placeholder="94102"
                  required
                />
              </div>
            </div>

            <Button onClick={handleShippingNext} className="w-full btn-hero">
              Continue to Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Payment Information</h2>
              <p className="text-muted-foreground">
                Secure payment powered by Stripe
              </p>
            </div>

            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={paymentForm.cardNumber}
                onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={paymentForm.expiryDate}
                  onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={paymentForm.cvv}
                  onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                value={paymentForm.cardName}
                onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <Separator />

            <div className="text-sm text-muted-foreground">
              <h4 className="font-semibold mb-2">Billing Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="billingAddress">Address</Label>
                  <Input
                    id="billingAddress"
                    value={paymentForm.billingAddress}
                    onChange={(e) => handleInputChange('payment', 'billingAddress', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <Label htmlFor="billingCity">City</Label>
                  <Input
                    id="billingCity"
                    value={paymentForm.billingCity}
                    onChange={(e) => handleInputChange('payment', 'billingCity', e.target.value)}
                    placeholder="San Francisco"
                  />
                </div>
                <div>
                  <Label htmlFor="billingState">State</Label>
                  <Input
                    id="billingState"
                    value={paymentForm.billingState}
                    onChange={(e) => handleInputChange('payment', 'billingState', e.target.value)}
                    placeholder="CA"
                  />
                </div>
                <div>
                  <Label htmlFor="billingZip">ZIP Code</Label>
                  <Input
                    id="billingZip"
                    value={paymentForm.billingZip}
                    onChange={(e) => handleInputChange('payment', 'billingZip', e.target.value)}
                    placeholder="94102"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handlePaymentNext} className="w-full btn-hero">
              Review Order
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Review Your Order</h2>
              <p className="text-muted-foreground">
                Please review your order details before placing it
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{shippingForm.firstName} {shippingForm.lastName}</p>
                  <p>{shippingForm.address}</p>
                  <p>{shippingForm.city}, {shippingForm.state} {shippingForm.zipCode}</p>
                  <p>{shippingForm.country}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>**** **** **** {paymentForm.cardNumber.slice(-4)}</p>
                  <p>Expires: {paymentForm.expiryDate}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={handlePlaceOrder} 
              className="w-full btn-hero" 
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Placing Order...' : `Place Order - $${total.toFixed(2)}`}
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItems.length} />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase in a few simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Steps */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'border-muted-foreground text-muted-foreground'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <Card className="card-elegant">
              <CardContent className="p-8">
                {renderStepContent()}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-elegant sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  {shipping === 0 && (
                    <Badge variant="secondary" className="w-full justify-center">
                      🎉 Free shipping!
                    </Badge>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="h-4 w-4 mr-2" />
                    Secure checkout
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Powered by Stripe
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
