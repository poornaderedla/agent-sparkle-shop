import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Parse Railway connection string if available
let dbConfig: any = {};

if (process.env.DATABASE_URL) {
  // Parse Railway connection string
  const url = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: url.hostname,
    port: parseInt(url.port),
    database: url.pathname.substring(1), // Remove leading slash
    username: url.username,
    password: url.password,
  };
} else {
  // Fallback to individual environment variables
  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    database: process.env.DB_NAME || 'agentic_ecommerce',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  };
}

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export default sequelize;
