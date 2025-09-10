import sequelize from '../config/database';
import User from './User';
import Product from './Product';
import Cart from './Cart';
import Order from './Order';

// Initialize all models
const models = {
  User,
  Product,
  Cart,
  Order,
};

// Export models and sequelize instance
export { sequelize };
export default models;

// Sync database (for development)
export const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('✅ Database synchronized successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};
