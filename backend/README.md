# Agentic AI-Powered E-commerce Backend API

A robust, production-ready backend API built with Node.js, Express, TypeScript, and MySQL for the Agentic AI-Powered E-commerce Portal.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Product Management**: Full CRUD operations for products with categories and inventory
- **Shopping Cart**: Add, update, remove items with real-time stock validation
- **Order Management**: Complete order lifecycle with status tracking
- **Analytics Dashboard**: Comprehensive sales, customer, and inventory analytics
- **Security**: Rate limiting, input validation, password hashing, CORS protection
- **Database**: MySQL with Sequelize ORM for robust data management
- **Docker Ready**: Complete containerization with Docker Compose

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL 8.0
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, express-rate-limit
- **Validation**: express-validator, joi
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # Database configuration
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   ├── productController.ts # Product management
│   │   ├── cartController.ts    # Shopping cart operations
│   │   ├── orderController.ts   # Order management
│   │   └── analyticsController.ts # Analytics & reporting
│   ├── middleware/
│   │   ├── authMiddleware.ts    # JWT authentication
│   │   ├── roleMiddleware.ts    # Role-based access control
│   │   ├── rateLimiter.ts       # Rate limiting
│   │   └── validation.ts        # Input validation
│   ├── models/
│   │   ├── User.ts              # User model
│   │   ├── Product.ts           # Product model
│   │   ├── Cart.ts              # Cart model
│   │   ├── Order.ts             # Order model
│   │   └── index.ts             # Model exports
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes
│   │   ├── products.ts          # Product routes
│   │   ├── cart.ts              # Cart routes
│   │   ├── orders.ts            # Order routes
│   │   └── analytics.ts         # Analytics routes
│   ├── utils/
│   │   └── seedData.ts          # Database seeding
│   └── index.ts                 # Application entry point
├── package.json
├── tsconfig.json
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp env.example .env
   ```
   
   Update `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=agentic_ecommerce
   DB_USER=root
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=3001
   ```

4. **Database setup**
   ```bash
   # Create MySQL database
   mysql -u root -p -e "CREATE DATABASE agentic_ecommerce;"
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3001`

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f backend
   ```

3. **Stop services**
   ```bash
   docker-compose down
   ```

### Manual Docker Build

```bash
# Build image
docker build -t agentic-ecommerce-backend .

# Run container
docker run -p 3001:3001 \
  -e DB_HOST=your_mysql_host \
  -e DB_PASSWORD=your_password \
  -e JWT_SECRET=your_secret \
  agentic-ecommerce-backend
```

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/signup` | Register new user | No |
| POST | `/auth/login` | User login | No |
| GET | `/auth/me` | Get current user | Yes |

### Product Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/products` | List all products | Optional | - |
| GET | `/products/:id` | Get product details | Optional | - |
| GET | `/products/featured` | Get featured products | No | - |
| GET | `/products/categories` | Get all categories | No | - |
| POST | `/products` | Create product | Yes | Admin |
| PUT | `/products/:id` | Update product | Yes | Admin |
| DELETE | `/products/:id` | Delete product | Yes | Admin |

### Cart Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/cart/add` | Add item to cart | Yes | Customer |
| GET | `/cart` | Get user cart | Yes | Customer |
| PUT | `/cart/update/:id` | Update cart item | Yes | Customer |
| DELETE | `/cart/remove/:id` | Remove cart item | Yes | Customer |
| DELETE | `/cart/clear` | Clear entire cart | Yes | Customer |

### Order Endpoints

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/orders/create` | Create new order | Yes | Customer |
| GET | `/orders` | Get user orders | Yes | Customer |
| GET | `/orders/:id` | Get order details | Yes | Customer/Admin |
| GET | `/orders/admin/all` | Get all orders | Yes | Admin |
| PUT | `/orders/:id/status` | Update order status | Yes | Admin |

### Analytics Endpoints (Admin Only)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/analytics/sales` | Sales analytics | Yes | Admin |
| GET | `/analytics/customers` | Customer analytics | Yes | Admin |
| GET | `/analytics/inventory` | Inventory analytics | Yes | Admin |
| GET | `/analytics/dashboard` | Dashboard stats | Yes | Admin |

## 🔐 Authentication

### Register User
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "role": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Using JWT Token
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer','admin') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Cart Table
```sql
CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE KEY unique_user_product (user_id, product_id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  items JSON NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  shipping_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🔒 Security Features

- **Rate Limiting**: 50 requests/minute per IP (configurable)
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet**: Security headers middleware
- **SQL Injection Protection**: Sequelize ORM with parameterized queries

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📈 Performance

- **Compression**: Gzip compression for responses
- **Connection Pooling**: MySQL connection pooling
- **Lazy Loading**: Optimized database queries
- **Caching**: Redis integration ready
- **Health Checks**: Built-in health monitoring

## 🚀 Production Deployment

### Environment Variables
```env
NODE_ENV=production
PORT=3001
DB_HOST=your_mysql_host
DB_NAME=agentic_ecommerce
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
JWT_SECRET=your_super_secure_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Health Check
```bash
curl http://localhost:3001/health
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the logs for debugging

---

**Built with ❤️ for the Agentic AI-Powered E-commerce Portal**
