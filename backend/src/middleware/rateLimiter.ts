import rateLimit from 'express-rate-limit';

// In development, make limits very lenient to avoid interrupting local testing
const isDev = process.env.NODE_ENV === 'development';
const veryHighLimit = 100000;

// General rate limiter
export const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: isDev ? veryHighLimit : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '50'), // lenient in dev
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for auth endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isDev ? veryHighLimit : 5, // lenient in dev
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Admin rate limiter (more lenient)
export const adminLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: isDev ? veryHighLimit : 100, // lenient in dev
  message: {
    success: false,
    message: 'Too many admin requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Product creation rate limiter
export const productCreationLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: isDev ? veryHighLimit : 10, // lenient in dev
  message: {
    success: false,
    message: 'Too many product creation attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
