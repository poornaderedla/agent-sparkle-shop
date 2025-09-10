import { Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/authMiddleware';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';

export const getSalesAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    const { period = '30d' } = req.query;
    
    // Calculate date range based on period
    let dateRange: Date;
    switch (period) {
      case '7d':
        dateRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        dateRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        dateRange = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    // Total sales and revenue
    const totalOrders = await Order.count({
      where: {
        created_at: { [Op.gte]: dateRange },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    const totalRevenue = await Order.sum('total_price', {
      where: {
        created_at: { [Op.gte]: dateRange },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    // Sales trend (daily)
    const salesTrend = await sequelize.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as orders_count,
        SUM(total_price) as daily_revenue
      FROM orders 
      WHERE created_at >= :dateRange 
        AND status != 'cancelled'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, {
      replacements: { dateRange },
      type: QueryTypes.SELECT
    });

    // Top selling products
    const topProducts = await sequelize.query(`
      SELECT 
        p.id,
        p.name,
        p.category,
        SUM(JSON_EXTRACT(o.items, '$[*].quantity')) as total_sold,
        SUM(JSON_EXTRACT(o.items, '$[*].item_total')) as total_revenue
      FROM orders o
      CROSS JOIN JSON_TABLE(o.items, '$[*]' COLUMNS (
        product_id INT PATH '$.product_id',
        quantity INT PATH '$.quantity',
        item_total DECIMAL(10,2) PATH '$.item_total'
      )) as jt
      JOIN products p ON p.id = jt.product_id
      WHERE o.created_at >= :dateRange 
        AND o.status != 'cancelled'
      GROUP BY p.id, p.name, p.category
      ORDER BY total_sold DESC
      LIMIT 10
    `, {
      replacements: { dateRange },
      type: QueryTypes.SELECT
    });

    res.json({
      success: true,
      data: {
        period,
        totalOrders,
        totalRevenue: totalRevenue || 0,
        salesTrend,
        topProducts
      }
    });
  } catch (error) {
    console.error('Get sales analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCustomerAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    // Total customers
    const totalCustomers = await User.count({
      where: { role: 'customer' }
    });

    // Active customers (made at least one order)
    const activeCustomers = await User.count({
      where: {
        role: 'customer',
        id: {
          [Op.in]: sequelize.literal('(SELECT DISTINCT user_id FROM orders)')
        }
      }
    });

    // New customers this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const newCustomersThisMonth = await User.count({
      where: {
        role: 'customer',
        created_at: { [Op.gte]: thisMonth }
      }
    });

    // Customer growth trend
    const customerGrowth = await sequelize.query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as new_customers
      FROM users 
      WHERE role = 'customer'
        AND created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month ASC
    `, {
      type: QueryTypes.SELECT
    });

    res.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        newCustomersThisMonth,
        customerGrowth
      }
    });
  } catch (error) {
    console.error('Get customer analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getInventoryAnalytics = async (req: AuthRequest, res: Response) => {
  try {
    // Total products
    const totalProducts = await Product.count();

    // Low stock products (stock < 10)
    const lowStockProducts = await Product.findAll({
      where: {
        stock: { [Op.lt]: 10 },
        stock: { [Op.gt]: 0 }
      },
      order: [['stock', 'ASC']]
    });

    // Out of stock products
    const outOfStockProducts = await Product.findAll({
      where: { stock: 0 },
      order: [['name', 'ASC']]
    });

    // Featured products
    const featuredProducts = await Product.count({
      where: { featured: true }
    });

    // Products by category
    const productsByCategory = await sequelize.query(`
      SELECT 
        category,
        COUNT(*) as product_count,
        SUM(stock) as total_stock,
        AVG(price) as avg_price
      FROM products 
      GROUP BY category
      ORDER BY product_count DESC
    `, {
      type: QueryTypes.SELECT
    });

    res.json({
      success: true,
      data: {
        totalProducts,
        lowStockProducts,
        outOfStockProducts,
        featuredProducts,
        productsByCategory
      }
    });
  } catch (error) {
    console.error('Get inventory analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    // Today's stats
    const todayOrders = await Order.count({
      where: {
        created_at: { [Op.gte]: today },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    const todayRevenue = await Order.sum('total_price', {
      where: {
        created_at: { [Op.gte]: today },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    // This month's stats
    const monthOrders = await Order.count({
      where: {
        created_at: { [Op.gte]: thisMonth },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    const monthRevenue = await Order.sum('total_price', {
      where: {
        created_at: { [Op.gte]: thisMonth },
        status: { [Op.ne]: 'cancelled' }
      }
    });

    // Pending orders
    const pendingOrders = await Order.count({
      where: { status: 'pending' }
    });

    // Low stock alerts
    const lowStockCount = await Product.count({
      where: {
        stock: { [Op.lt]: 10 },
        stock: { [Op.gt]: 0 }
      }
    });

    res.json({
      success: true,
      data: {
        today: {
          orders: todayOrders,
          revenue: todayRevenue || 0
        },
        thisMonth: {
          orders: monthOrders,
          revenue: monthRevenue || 0
        },
        alerts: {
          pendingOrders,
          lowStockCount
        }
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
