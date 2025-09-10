import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import User from '../models/User';
import { AuthRequest } from '../middleware/authMiddleware';
import { Op } from 'sequelize';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { shipping_address } = req.body;
    const userId = req.user!.id;

    // Get cart items
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [{ model: Product, as: 'product' }]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate stock and calculate total
    let total = 0;
    const orderItems: any[] = [];

    for (const cartItem of cartItems) {
      const product = cartItem.product!;
      
      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      const itemTotal = cartItem.quantity * parseFloat(product.price.toString());
      total += itemTotal;

      orderItems.push({
        product_id: product.id,
        product_name: product.name,
        product_price: product.price,
        quantity: cartItem.quantity,
        item_total: itemTotal
      });
    }

    // Create order
    const order = await Order.create({
      user_id: userId,
      items: orderItems,
      total_price: total,
      shipping_address
    });

    // Update product stock
    for (const cartItem of cartItems) {
      const product = cartItem.product!;
      await product.update({
        stock: product.stock - cartItem.quantity
      });
    }

    // Clear cart
    await Cart.destroy({
      where: { user_id: userId }
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { page = 1, limit = 10, status } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = { user_id: userId };

    if (status) {
      where.status = status;
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(count / Number(limit)),
          totalItems: count,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, status, user_id } = req.query;

    const offset = (Number(page) - 1) * Number(limit);
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (user_id) {
      where.user_id = user_id;
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role']
        }
      ],
      limit: Number(limit),
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(count / Number(limit)),
          totalItems: count,
          itemsPerPage: Number(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const where: any = { id };
    
    // Non-admin users can only see their own orders
    if (userRole !== 'admin') {
      where.user_id = userId;
    }

    const order = await Order.findOne({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: { order }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.update({ status });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
