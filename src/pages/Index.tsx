import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productAPI, cartAPI } from '@/lib/api';
import type { Product } from '@/lib/api';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();

  // Mock products for fallback
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones Pro',
      description: 'Premium noise-canceling headphones with 30-hour battery life',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format&q=80',
      category: 'electronics',
      stock: 15,
      featured: true,
    },
    {
      id: '2',
      name: 'Eco-Friendly Water Bottle',
      description: 'Sustainable stainless steel bottle with temperature control',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&auto=format&q=80',
      category: 'lifestyle',
      stock: 32,
      featured: true,
    },
    {
      id: '3',
      name: 'Smart Fitness Watch',
      description: 'Advanced health tracking with GPS and heart rate monitor',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format&q=80',
      category: 'electronics',
      stock: 8,
      featured: true,
    },
    {
      id: '4',
      name: 'Camping Backpack',
      description: 'Durable hiking backpack for outdoor adventures',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format&q=80',
      category: 'sports',
      stock: 20,
      featured: true,
    },
  ];

  // Load featured products from backend
  const loadFeaturedProducts = async () => {
    try {
      const response = await productAPI.getFeatured();
      // Ensure response.data is an array before setting it
      if (Array.isArray(response.data)) {
        setFeaturedProducts(response.data);
      } else {
        console.warn('API returned non-array data, using mock products');
        setFeaturedProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error loading featured products:', error);
      // Fallback to mock data if API fails
      setFeaturedProducts(mockProducts);
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: ShoppingBag, label: 'Products Sold', value: '200K+' },
    { icon: TrendingUp, label: 'Customer Satisfaction', value: '99%' },
    { icon: Star, label: 'Average Rating', value: '4.9' },
  ];

  const handleAddToCart = async (productId: string) => {
    try {
      await cartAPI.add(productId, 1);
      setCartItemCount(prev => prev + 1);
      toast({
        title: "Added to cart! 🛒",
        description: "Product has been added to your shopping cart.",
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        const next = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/admin/login?next=${next}`;
        return;
      }
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItemCount} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🚀 AI-Powered Shopping Experience
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Discover Amazing
                  <span className="text-gradient block">Products</span>
                  Effortlessly
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Shop smarter with our AI-powered recommendations, curated collections, 
                  and sustainable products that match your lifestyle.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/products">
                    <Button size="lg" className="btn-hero">
                      Shop Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Shopping Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-elegant"
              >
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              ⭐ Featured Products
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trending <span className="text-gradient">Products</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our hand-picked selection of the most popular products loved by our community
            </p>
          </motion.div>

          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button size="lg" variant="outline" className="btn-ghost-primary">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
