import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/api';

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cartItemCount, setCartItemCount] = useState(0);
  const { toast } = useToast();

  // Mock products data - Complete catalog for all categories
  useEffect(() => {
    const mockProducts: Product[] = [
      // Electronics
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
        name: 'Smart Fitness Watch',
        description: 'Advanced health tracking with GPS and heart rate monitor',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'electronics',
        stock: 8,
        featured: true,
      },
      {
        id: '3',
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof speaker with crystal clear sound',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'electronics',
        stock: 22,
        featured: false,
      },
      {
        id: '4',
        name: 'Smartphone Pro Max',
        description: 'Latest flagship smartphone with advanced camera system',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'electronics',
        stock: 5,
        featured: true,
      },
      {
        id: '5',
        name: 'Laptop Gaming Elite',
        description: 'High-performance gaming laptop with RTX graphics',
        price: 1599.99,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'electronics',
        stock: 3,
        featured: false,
      },

      // Fashion
      {
        id: '6',
        name: 'Designer Leather Jacket',
        description: 'Premium leather jacket with modern cut and classic style',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'fashion',
        stock: 12,
        featured: true,
      },
      {
        id: '7',
        name: 'Casual Cotton T-Shirt',
        description: 'Comfortable organic cotton t-shirt in multiple colors',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'fashion',
        stock: 45,
        featured: false,
      },
      {
        id: '8',
        name: 'Running Sneakers',
        description: 'Lightweight performance sneakers for active lifestyle',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'fashion',
        stock: 18,
        featured: true,
      },
      {
        id: '9',
        name: 'Denim Jeans Classic',
        description: 'Timeless denim jeans with perfect fit and durability',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'fashion',
        stock: 28,
        featured: false,
      },

      // Home & Living
      {
        id: '10',
        name: 'Minimalist Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness and color',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'home',
        stock: 12,
        featured: true,
      },
      {
        id: '11',
        name: 'Cozy Throw Blanket',
        description: 'Ultra-soft blanket perfect for relaxing evenings',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'home',
        stock: 25,
        featured: false,
      },
      {
        id: '12',
        name: 'Plant Pot Set',
        description: 'Ceramic plant pots in various sizes for indoor gardening',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'home',
        stock: 30,
        featured: true,
      },
      {
        id: '13',
        name: 'Coffee Table Modern',
        description: 'Sleek wooden coffee table with storage compartment',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'home',
        stock: 8,
        featured: false,
      },

      // Lifestyle
      {
        id: '14',
        name: 'Eco-Friendly Water Bottle',
        description: 'Sustainable stainless steel bottle with temperature control',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'lifestyle',
        stock: 32,
        featured: true,
      },
      {
        id: '15',
        name: 'Yoga Mat Premium',
        description: 'Non-slip yoga mat made from natural rubber',
        price: 69.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'lifestyle',
        stock: 20,
        featured: false,
      },
      {
        id: '16',
        name: 'Essential Oils Set',
        description: 'Collection of pure essential oils for aromatherapy',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'lifestyle',
        stock: 15,
        featured: true,
      },

      // Accessories
      {
        id: '17',
        name: 'Bamboo Phone Case',
        description: 'Eco-friendly phone case made from sustainable bamboo',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'accessories',
        stock: 45,
        featured: false,
      },
      {
        id: '18',
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with RFID protection',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1627123391137-2d81ebb94edc?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'accessories',
        stock: 25,
        featured: true,
      },
      {
        id: '19',
        name: 'Sunglasses Classic',
        description: 'UV protection sunglasses with polarized lenses',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'accessories',
        stock: 18,
        featured: false,
      },

      // Sports & Outdoor
      {
        id: '20',
        name: 'Camping Backpack',
        description: 'Durable hiking backpack with multiple compartments',
        price: 179.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'sports',
        stock: 12,
        featured: true,
      },
      {
        id: '21',
        name: 'Tennis Racket Pro',
        description: 'Professional tennis racket for serious players',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'sports',
        stock: 8,
        featured: false,
      },
      {
        id: '22',
        name: 'Basketball Official',
        description: 'Official size basketball with premium grip',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'sports',
        stock: 30,
        featured: true,
      },
      {
        id: '23',
        name: 'Cycling Helmet',
        description: 'Lightweight safety helmet with ventilation system',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'sports',
        stock: 15,
        featured: false,
      },

      // Books & Media
      {
        id: '24',
        name: 'Programming Guide 2024',
        description: 'Complete guide to modern web development',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'books',
        stock: 50,
        featured: true,
      },
      {
        id: '25',
        name: 'Design Thinking Book',
        description: 'Essential principles of creative problem solving',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'books',
        stock: 25,
        featured: false,
      },
      {
        id: '26',
        name: 'Business Strategy',
        description: 'Modern approaches to business growth and innovation',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'books',
        stock: 20,
        featured: false,
      },

      // Automotive
      {
        id: '27',
        name: 'Car Phone Mount',
        description: 'Universal smartphone mount for car dashboard',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'automotive',
        stock: 40,
        featured: false,
      },
      {
        id: '28',
        name: 'Car Care Kit',
        description: 'Complete car cleaning and maintenance kit',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1494976688153-57bda8075e89?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'automotive',
        stock: 15,
        featured: true,
      },
      {
        id: '29',
        name: 'Dash Camera HD',
        description: 'High-definition dashboard camera with night vision',
        price: 159.99,
        image: 'https://images.unsplash.com/photo-1621761190650-6c1f6c6ba05c?w=500&h=500&fit=crop&auto=format&q=80',
        category: 'automotive',
        stock: 12,
        featured: false,
      },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const categories = ['all', 'electronics', 'fashion', 'home', 'lifestyle', 'accessories', 'sports', 'books', 'automotive'];

  // Update URL when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  // Listen for URL parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  // Filter products based on search, category, and price
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (productId: string) => {
    setCartItemCount(prev => prev + 1);
    toast({
      title: "Added to cart! 🛒",
      description: "Product has been added to your shopping cart.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={cartItemCount} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            {selectedCategory === 'all' 
              ? 'All Products' 
              : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
            }
          </h1>
          <p className="text-muted-foreground">
            {selectedCategory === 'all' 
              ? 'Discover our complete collection of amazing products'
              : `Explore our ${selectedCategory} category collection`
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="card-elegant p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : 
                         category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {filteredProducts.length} Products
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            <motion.div
              layout
              className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    className={viewMode === 'list' ? 'flex' : ''}
                  />
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-muted-foreground mb-4">
                  No products found matching your criteria
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    handleCategoryChange('all');
                    setPriceRange([0, 1000]);
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductListing;