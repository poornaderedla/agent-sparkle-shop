import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  featured?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'featured' | 'created_at' | 'updated_at'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public category!: string;
  public image_url!: string;
  public featured!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Instance methods
  public isInStock(): boolean {
    return this.stock > 0;
  }

  public isLowStock(): boolean {
    return this.stock < 10 && this.stock > 0;
  }

  public isOutOfStock(): boolean {
    return this.stock === 0;
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
  }
);

export default Product;
