import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getCategories
} from '../controllers/productController';
import { authenticateToken, optionalAuth } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';
import { generalLimiter, productCreationLimiter } from '../middleware/rateLimiter';
import { validateProduct } from '../middleware/validation';

const router = Router();

// Apply general rate limiting
router.use(generalLimiter);

// Public routes
router.get('/', optionalAuth, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', optionalAuth, getProductById);

// Admin-only routes
router.post('/', 
  authenticateToken, 
  requireAdmin, 
  productCreationLimiter, 
  validateProduct, 
  createProduct
);

router.put('/:id', 
  authenticateToken, 
  requireAdmin, 
  validateProduct, 
  updateProduct
);

router.delete('/:id', 
  authenticateToken, 
  requireAdmin, 
  deleteProduct
);

export default router;
