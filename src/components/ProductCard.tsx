import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductQuickView from './ProductQuickView';
import type { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

const ProductCard = ({ product, onAddToCart, onQuickView, className }: ProductCardProps) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Color mapping for display
  const getColorValue = (color: string) => {
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
    return colorMap[color] || color;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
    onQuickView?.(product);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      <Card className="card-elegant card-hover overflow-hidden group">
        <div className="relative aspect-square overflow-hidden">
          {/* Product Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            onError={(e) => {
              e.currentTarget.src = '/product-placeholder.svg';
            }}
            loading="lazy"
          />
          
          {/* Overlay Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-2 transition-opacity duration-300"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={handleQuickView}
                className="glass"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant="secondary"
                className="glass"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.discount && product.discount > 0 && (
              <Badge variant="destructive" className="bg-red-500">
                -{product.discount}%
              </Badge>
            )}
            {product.featured && (
              <Badge variant="destructive" className="bg-gradient-to-r from-yellow-500 to-orange-500">
                Featured
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive" className="bg-warning">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="destructive">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="glass text-lg font-bold">
              ${product.price.toFixed(2)}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Category and Brand */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </div>
              {product.brand && (
                <Badge variant="outline" className="text-xs">
                  {product.brand}
                </Badge>
              )}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= Math.floor(product.rating!)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            )}

            {/* Color and Size */}
            <div className="flex items-center space-x-3">
              {product.color && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Color:</span>
                  <div className="flex items-center space-x-1">
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: getColorValue(product.color) }}
                      title={product.color}
                    />
                    <span className="text-xs capitalize">{product.color}</span>
                  </div>
                </div>
              )}
              {product.size && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Size:</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.size}
                  </Badge>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Quick View Modal */}
      <ProductQuickView
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={onAddToCart}
      />
    </motion.div>
  );
};

export default ProductCard;