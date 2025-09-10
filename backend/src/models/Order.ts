import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

export interface OrderItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  item_total: number;
}

export interface OrderAttributes {
  id: number;
  user_id: number;
  items: OrderItem[]; // JSON field for order items
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'shipping_address' | 'created_at' | 'updated_at'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public user_id!: number;
  public items!: OrderItem[];
  public total_price!: number;
  public status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  public shipping_address?: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Associations
  public user?: User;

  // Instance methods
  public isPending(): boolean {
    return this.status === 'pending';
  }

  public isProcessing(): boolean {
    return this.status === 'processing';
  }

  public isShipped(): boolean {
    return this.status === 'shipped';
  }

  public isDelivered(): boolean {
    return this.status === 'delivered';
  }

  public isCancelled(): boolean {
    return this.status === 'cancelled';
  }

  public canBeCancelled(): boolean {
    return this.status === 'pending' || this.status === 'processing';
  }
}

Order.init(
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
    items: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    shipping_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'orders',
  }
);

// Define associations
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

export default Order;
