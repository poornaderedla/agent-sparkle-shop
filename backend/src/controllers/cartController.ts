import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/authMiddleware';

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    const userId = req.user!.id;

    // Check if product exists and is in stock
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: { user_id: userId, product_id }
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock available'
        });
      }
      await existingCartItem.update({ quantity: newQuantity });
    } else {
      // Create new cart item
      await Cart.create({
        user_id: userId,
        product_id,
        quantity
      });
    }

    res.json({
      success: true,
      message: 'Product added to cart successfully'
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Product,
          as: 'product'
        }
      ]
    });

    // Calculate total
    let total = 0;
    const items = cartItems.map(item => {
      const itemTotal = item.quantity * parseFloat(item.product!.price.toString());
      total += itemTotal;
      
      return {
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        itemTotal
      };
    });

    res.json({
      success: true,
      data: {
        items,
        total: total.toFixed(2)
      }
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user!.id;

    const cartItem = await Cart.findOne({
      where: { id, user_id: userId },
      include: [{ model: Product, as: 'product' }]
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check stock availability
    if (cartItem.product!.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      return res.json({
        success: true,
        message: 'Item removed from cart'
      });
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated successfully'
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const cartItem = await Cart.findOne({
      where: { id, user_id: userId }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.destroy();

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    await Cart.destroy({
      where: { user_id: userId }
    });

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
