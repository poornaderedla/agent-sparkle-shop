import { Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/authMiddleware';

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, product_id, quantity = 1 } = req.body;
    const product_id_final = productId || product_id;
    const userId = req.user!.id;

    // Check if product exists and is in stock
    const product = await Product.findByPk(product_id_final);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
      return;
    }

    // Check if item already exists in cart
    const existingCartItem = await Cart.findOne({
      where: { user_id: userId, product_id: product_id_final }
    });

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      if (product.stock < newQuantity) {
        res.status(400).json({
          success: false,
          message: 'Insufficient stock available'
        });
        return;
      }
      await existingCartItem.update({ quantity: newQuantity });
    } else {
      // Create new cart item
      await Cart.create({
        user_id: userId,
        product_id: product_id_final,
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

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user!.id;

    const cartItem = await Cart.findOne({
      where: { id, user_id: userId },
      include: [{ model: Product, as: 'product' }]
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
      return;
    }

    // Check stock availability
    if (cartItem.product!.stock < quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient stock available'
      });
      return;
    }

    if (quantity <= 0) {
      await cartItem.destroy();
      res.json({
        success: true,
        message: 'Item removed from cart'
      });
      return;
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

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const cartItem = await Cart.findOne({
      where: { id, user_id: userId }
    });

    if (!cartItem) {
      res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
      return;
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
