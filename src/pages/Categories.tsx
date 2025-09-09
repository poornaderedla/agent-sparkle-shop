import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  trending: boolean;
  featured: boolean;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Mock categories data
  useEffect(() => {
    const mockCategories: Category[] = [
      {
        id: 'electronics',
        name: 'Electronics',
        description: 'Latest gadgets, smartphones, laptops, and tech accessories',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop',
        productCount: 45,
        trending: true,
        featured: true,
      },
      {
        id: 'fashion',
        name: 'Fashion',
        description: 'Trendy clothing, shoes, and accessories for all styles',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
        productCount: 78,
        trending: true,
        featured: true,
      },
      {
        id: 'home',
        name: 'Home & Living',
        description: 'Furniture, decor, kitchen essentials, and home improvement',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
        productCount: 52,
        trending: false,
        featured: true,
      },
      {
        id: 'lifestyle',
        name: 'Lifestyle',
        description: 'Health, fitness, beauty, and wellness products',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&h=400&fit=crop',
        productCount: 34,
        trending: true,
        featured: false,
      },
      {
        id: 'accessories',
        name: 'Accessories',
        description: 'Bags, jewelry, watches, and lifestyle accessories',
        image: 'https://images.unsplash.com/photo-1506629905107-14b29379047a?w=600&h=400&fit=crop',
        productCount: 29,
        trending: false,
        featured: false,
      },
      {
        id: 'sports',
        name: 'Sports & Outdoor',
        description: 'Athletic gear, outdoor equipment, and fitness accessories',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
        productCount: 41,
        trending: true,
        featured: true,
      },
      {
        id: 'books',
        name: 'Books & Media',
        description: 'Books, magazines, digital content, and educational materials',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
        productCount: 23,
        trending: false,
        featured: false,
      },
      {
        id: 'automotive',
        name: 'Automotive',
        description: 'Car accessories, tools, and automotive care products',
        image: 'https://images.unsplash.com/photo-1494976688153-57bda8075e89?w=600&h=400&fit=crop',
        productCount: 18,
        trending: false,
        featured: false,
      },
    ];
    setCategories(mockCategories);
  }, []);

  const featuredCategories = categories.filter(cat => cat.featured);
  const allCategories = categories;

  const stats = [
    { icon: Package, label: 'Total Categories', value: categories.length.toString() },
    { icon: TrendingUp, label: 'Trending Categories', value: categories.filter(c => c.trending).length.toString() },
    { icon: Star, label: 'Featured Categories', value: featuredCategories.length.toString() },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            🏷️ Shop by Category
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Explore <span className="text-gradient">Categories</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing products organized by category. From electronics to fashion, 
            find exactly what you're looking for.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <Card className="card-elegant card-hover">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Featured Categories</h2>
              <p className="text-muted-foreground">Our most popular product categories</p>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {featuredCategories.length} Categories
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/products?category=${category.id}`}>
                  <Card className="card-elegant card-hover overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {category.trending && (
                          <Badge variant="destructive" className="bg-gradient-to-r from-orange-500 to-red-500">
                            🔥 Trending
                          </Badge>
                        )}
                        <Badge variant="secondary" className="glass">
                          {category.productCount} Products
                        </Badge>
                      </div>

                      {/* Category Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                        <p className="text-sm text-white/80 mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex items-center text-sm font-medium"
                        >
                          Shop Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">All Categories</h2>
              <p className="text-muted-foreground">Browse our complete category collection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/products?category=${category.id}`}>
                  <Card className="card-elegant card-hover h-full">
                    <CardContent className="p-4">
                      <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          {category.trending && (
                            <Badge variant="destructive" className="text-xs">
                              🔥
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="outline" className="text-xs">
                            {category.productCount} items
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 py-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl"
        >
          <h3 className="text-2xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Browse all our products or use our advanced search to find exactly what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="btn-hero">
                  Browse All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" variant="outline" className="btn-ghost-primary">
                Advanced Search
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Categories;