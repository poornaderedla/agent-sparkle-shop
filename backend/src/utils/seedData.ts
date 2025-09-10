import User from '../models/User';
import Product from '../models/Product';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminExists = await User.findOne({ where: { email: process.env.ADMIN_EMAIL || 'admin@ecoshop.com' } });
    if (!adminExists) {
      await User.create({
        email: process.env.ADMIN_EMAIL || 'admin@ecoshop.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    // Create sample customer
    const customerExists = await User.findOne({ where: { email: 'demo@user.com' } });
    if (!customerExists) {
      await User.create({
        email: 'demo@user.com',
        password: 'password123',
        role: 'customer'
      });
      console.log('✅ Demo customer created');
    }

    // Check if products already exist
    const productCount = await Product.count();
    if (productCount === 0) {
      // Create sample products
      const sampleProducts = [
        {
          name: 'Wireless Headphones Pro',
          description: 'Premium noise-canceling headphones with 30-hour battery life',
          price: 299.99,
          stock: 15,
          category: 'electronics',
          image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Smart Fitness Watch',
          description: 'Advanced health tracking with GPS and heart rate monitor',
          price: 199.99,
          stock: 8,
          category: 'electronics',
          image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Bluetooth Speaker',
          description: 'Portable waterproof speaker with crystal clear sound',
          price: 89.99,
          stock: 22,
          category: 'electronics',
          image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Designer Leather Jacket',
          description: 'Premium leather jacket with modern cut and classic style',
          price: 299.99,
          stock: 12,
          category: 'fashion',
          image_url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Casual Cotton T-Shirt',
          description: 'Comfortable organic cotton t-shirt in multiple colors',
          price: 24.99,
          stock: 45,
          category: 'fashion',
          image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Running Sneakers',
          description: 'Lightweight performance sneakers for active lifestyle',
          price: 129.99,
          stock: 18,
          category: 'fashion',
          image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Minimalist Desk Lamp',
          description: 'Modern LED desk lamp with adjustable brightness and color',
          price: 79.99,
          stock: 12,
          category: 'home',
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Cozy Throw Blanket',
          description: 'Ultra-soft blanket perfect for relaxing evenings',
          price: 49.99,
          stock: 25,
          category: 'home',
          image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Eco-Friendly Water Bottle',
          description: 'Sustainable stainless steel bottle with temperature control',
          price: 45.99,
          stock: 32,
          category: 'lifestyle',
          image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Yoga Mat Premium',
          description: 'Non-slip yoga mat made from natural rubber',
          price: 69.99,
          stock: 20,
          category: 'lifestyle',
          image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Bamboo Phone Case',
          description: 'Eco-friendly phone case made from sustainable bamboo',
          price: 24.99,
          stock: 45,
          category: 'accessories',
          image_url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Leather Wallet',
          description: 'Handcrafted leather wallet with RFID protection',
          price: 59.99,
          stock: 25,
          category: 'accessories',
          image_url: 'https://images.unsplash.com/photo-1627123391137-2d81ebb94edc?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Camping Backpack',
          description: 'Durable hiking backpack with multiple compartments',
          price: 179.99,
          stock: 12,
          category: 'sports',
          image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        },
        {
          name: 'Tennis Racket Pro',
          description: 'Professional tennis racket for serious players',
          price: 249.99,
          stock: 8,
          category: 'sports',
          image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop&auto=format&q=80',
          featured: false,
        },
        {
          name: 'Programming Guide 2024',
          description: 'Complete guide to modern web development',
          price: 49.99,
          stock: 50,
          category: 'books',
          image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=500&fit=crop&auto=format&q=80',
          featured: true,
        }
      ];

      await Product.bulkCreate(sampleProducts);
      console.log('✅ Sample products created');
    }

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
};
