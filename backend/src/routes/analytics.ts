import { Router } from 'express';
import {
  getSalesAnalytics,
  getCustomerAnalytics,
  getInventoryAnalytics,
  getDashboardStats
} from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';
import { adminLimiter } from '../middleware/rateLimiter';

const router = Router();

// Apply rate limiting, authentication, and admin access
router.use(adminLimiter);
router.use(authenticateToken);
router.use(requireAdmin);

// Analytics routes
router.get('/sales', getSalesAnalytics);
router.get('/customers', getCustomerAnalytics);
router.get('/inventory', getInventoryAnalytics);
router.get('/dashboard', getDashboardStats);

export default router;
