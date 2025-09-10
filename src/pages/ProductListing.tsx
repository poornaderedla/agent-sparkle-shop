import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Search, Grid, List, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { productAPI, cartAPI } from '@/lib/api';
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
  
  // New filter states
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const { toast } = useToast();

  // Load products from backend API
  const loadProducts = async () => {
    try {
      let response;
      if (selectedCategory === 'all') {
        response = await productAPI.getAll();
      } else {
        response = await productAPI.getByCategory(selectedCategory);
      }
      const apiData: any = response.data;
      const list: Product[] = Array.isArray(apiData)
        ? apiData
        : (Array.isArray(apiData?.data) ? apiData.data : []);

      if (Array.isArray(list) && list.length > 0) {
        setProducts(list);
        setFilteredProducts(list);
      } else {
        // Fallback to mock data if API returns non-array or empty
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
      // Fallback to mock on error
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  // Mock products data - Complete catalog for all categories (fallback)
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
        color: 'black',
        brand: 'Sony',
        rating: 4.8,
        discount: 10,
        tags: ['wireless', 'noise-canceling', 'premium'],
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
        color: 'silver',
        brand: 'Apple',
        rating: 4.6,
        tags: ['fitness', 'smartwatch', 'health'],
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
        color: 'blue',
        brand: 'JBL',
        rating: 4.4,
        discount: 15,
        tags: ['portable', 'waterproof', 'bluetooth'],
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
        color: 'space gray',
        brand: 'Apple',
        rating: 4.9,
        tags: ['smartphone', 'flagship', 'camera'],
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
        color: 'black',
        brand: 'ASUS',
        rating: 4.7,
        tags: ['gaming', 'laptop', 'high-performance'],
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
        color: 'brown',
        brand: 'Gucci',
        size: 'L',
        rating: 4.5,
        tags: ['leather', 'designer', 'jacket'],
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
        color: 'white',
        brand: 'Nike',
        size: 'M',
        rating: 4.2,
        discount: 20,
        tags: ['cotton', 'casual', 'organic'],
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
        color: 'red',
        brand: 'Nike',
        size: '10',
        rating: 4.6,
        tags: ['running', 'sneakers', 'performance'],
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
        color: 'blue',
        brand: 'Levi\'s',
        size: '32',
        rating: 4.3,
        tags: ['denim', 'jeans', 'classic'],
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
        color: 'white',
        brand: 'IKEA',
        rating: 4.4,
        tags: ['lamp', 'LED', 'minimalist'],
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
        color: 'gray',
        brand: 'Target',
        rating: 4.1,
        tags: ['blanket', 'cozy', 'soft'],
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
        color: 'terracotta',
        brand: 'West Elm',
        rating: 4.7,
        tags: ['plants', 'ceramic', 'gardening'],
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
        color: 'walnut',
        brand: 'West Elm',
        rating: 4.5,
        tags: ['furniture', 'wooden', 'modern'],
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
  // Fallback to mock data if API fails
  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    }
  }, []);

  const categories = ['all', 'electronics', 'fashion', 'home', 'lifestyle', 'accessories', 'sports', 'books', 'automotive'];

  // Get unique values for filters
  const getUniqueColors = () => {
    const base = Array.isArray(products) ? products : [];
    const colors = base.map(p => p.color).filter(Boolean);
    return [...new Set(colors)];
  };

  const getUniqueBrands = () => {
    const base = Array.isArray(products) ? products : [];
    const brands = base.map(p => p.brand).filter(Boolean);
    return [...new Set(brands)];
  };

  const getUniqueSizes = () => {
    const base = Array.isArray(products) ? products : [];
    const sizes = base.map(p => p.size).filter(Boolean);
    return [...new Set(sizes)];
  };

  // Color mapping for display
  const colorMap: { [key: string]: string } = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#EF4444',
    'blue': '#3B82F6',
    'green': '#10B981',
    'yellow': '#F59E0B',
    'purple': '#8B5CF6',
    'pink': '#EC4899',
    'gray': '#6B7280',
    'brown': '#92400E',
    'silver': '#9CA3AF',
    'space gray': '#374151',
    'terracotta': '#C2410C',
    'walnut': '#92400E',
  };

  // Filter helper functions
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setPriceRange([0, 1000]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedRating(0);
    setAvailabilityFilter('all');
    setFeaturedOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

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
    const featuredParam = searchParams.get('featured');
    const sortParam = searchParams.get('sort');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }

    // Handle featured filter
    if (featuredParam === 'true') {
      setFeaturedOnly(true);
    } else {
      setFeaturedOnly(false);
    }

    // Handle sort parameter
    if (sortParam === 'newest') {
      setSortBy('newest');
    } else if (sortParam === 'featured') {
      setSortBy('featured');
    }
  }, [searchParams]);

  // Filter products based on all criteria
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
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

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.color && selectedColors.includes(product.color)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.size && selectedSizes.includes(product.size)
      );
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => 
        product.rating && product.rating >= selectedRating
      );
    }

    // Availability filter
    if (availabilityFilter !== 'all') {
      filtered = filtered.filter(product => {
        switch (availabilityFilter) {
          case 'in-stock':
            return product.stock > 10;
          case 'low-stock':
            return product.stock > 0 && product.stock <= 10;
          case 'out-of-stock':
            return product.stock === 0;
          default:
            return true;
        }
      });
    }

    // Featured filter
    if (featuredOnly) {
      filtered = filtered.filter(product => product.featured === true);
    }

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
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Sort by ID in descending order (assuming higher IDs are newer)
        filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy, selectedColors, selectedBrands, selectedSizes, selectedRating, availabilityFilter, featuredOnly]);

  const handleAddToCart = async (productId: string) => {
    try {
      await cartAPI.add(productId, 1);
      setCartItemCount(prev => prev + 1);
      toast({
        title: "Added to cart! 🛒",
        description: "Product has been added to your shopping cart.",
      });
    } catch (error) {
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
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            {featuredOnly 
              ? 'Featured Products'
              : selectedCategory === 'all' 
                ? 'All Products' 
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
            }
          </h1>
          <p className="text-muted-foreground">
            {featuredOnly
              ? 'Discover our hand-picked selection of featured products'
              : selectedCategory === 'all' 
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
              <div className="space-y-2 mb-6">
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

              {/* Color Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Color</label>
                <div className="flex flex-wrap gap-2">
                  {getUniqueColors().map(color => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColors.includes(color)
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: colorMap[color] || color }}
                      title={color}
                    >
                      {selectedColors.includes(color) && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <X className="w-3 h-3 text-white drop-shadow-sm" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Brand</label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {getUniqueBrands().map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Size</label>
                <div className="flex flex-wrap gap-2">
                  {getUniqueSizes().map(size => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                        selectedSizes.includes(size)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Minimum Rating</label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedRating(rating)}
                      className={`p-1 transition-colors duration-200 ${
                        selectedRating >= rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.button>
                  ))}
                  {selectedRating > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedRating(0)}
                      className="ml-2 h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  )}
                </div>
                {selectedRating > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {selectedRating}+ stars
                  </p>
                )}
              </div>

              {/* Availability Filter */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Availability</label>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear All Filters */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
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
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
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
                  onClick={clearAllFilters}
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
