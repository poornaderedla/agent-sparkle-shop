import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Product from './Product';

export interface CartAttributes {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CartCreationAttributes extends Optional<CartAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public user_id!: number;
  public product_id!: number;
  public quantity!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associations
  public user?: User;
  public product?: Product;
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize,
    tableName: 'carts',
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'product_id'],
      },
    ],
  }
);

// Define associations
Cart.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Cart.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

User.hasMany(Cart, { foreignKey: 'user_id', as: 'cartItems' });
Product.hasMany(Cart, { foreignKey: 'product_id', as: 'cartItems' });

export default Cart;
