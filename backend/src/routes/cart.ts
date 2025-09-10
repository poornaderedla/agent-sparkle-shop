import { Router } from 'express';
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from '../controllers/cartController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireCustomer } from '../middleware/roleMiddleware';
import { generalLimiter } from '../middleware/rateLimiter';
import { validateCartItem, validateCartUpdate } from '../middleware/validation';

const router = Router();

// Apply rate limiting and authentication
router.use(generalLimiter);
router.use(authenticateToken);
router.use(requireCustomer);

// Cart routes
router.post('/add', validateCartItem, addToCart);
router.get('/', getCart);
router.put('/update/:id', validateCartUpdate, updateCartItem);
router.delete('/remove/:id', removeFromCart);
router.delete('/clear', clearCart);

export default router;
