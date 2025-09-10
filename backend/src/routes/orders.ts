import { Router } from 'express';
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} from '../controllers/orderController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireCustomer, requireAdmin, requireRole } from '../middleware/roleMiddleware';
import { generalLimiter } from '../middleware/rateLimiter';
import { validateOrder, validateOrderStatus } from '../middleware/validation';

const router = Router();

// Apply rate limiting and authentication
router.use(generalLimiter);
router.use(authenticateToken);

// Customer routes
router.post('/create', requireCustomer, validateOrder, createOrder);
router.get('/', requireCustomer, getUserOrders);
router.get('/:id', requireRole(['customer', 'admin']), getOrderById);

// Admin routes
router.get('/admin/all', requireAdmin, getAllOrders);
router.put('/:id/status', requireAdmin, validateOrderStatus, updateOrderStatus);

export default router;
