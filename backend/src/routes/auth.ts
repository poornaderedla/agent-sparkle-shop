import { Router } from 'express';
import { signup, login, getMe, updateProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimiter';
import { validateSignup, validateLogin } from '../middleware/validation';

const router = Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/me', authenticateToken, getMe);
router.put('/profile', authenticateToken, updateProfile);

export default router;
