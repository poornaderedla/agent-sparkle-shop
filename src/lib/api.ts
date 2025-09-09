import axios from 'axios';

// API Base Configuration
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  customerInfo: {
    name: string;
    email: string;
    address: string;
  };
  createdAt: string;
}

export interface Analytics {
  totalSales: number;
  totalCustomers: number;
  totalProducts: number;
  salesTrend: Array<{ date: string; sales: number }>;
  topProducts: Array<{ product: Product; sales: number }>;
}

// API Endpoints
export const productAPI = {
  getAll: () => api.get<Product[]>('/products'),
  getById: (id: string) => api.get<Product>(`/products/${id}`),
  getFeatured: () => api.get<Product[]>('/products/featured'),
  getByCategory: (category: string) => api.get<Product[]>(`/products/category/${category}`),
  create: (product: Omit<Product, 'id'>) => api.post<Product>('/products', product),
  update: (id: string, product: Partial<Product>) => api.put<Product>(`/products/${id}`, product),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const cartAPI = {
  get: () => api.get<CartItem[]>('/cart'),
  add: (productId: string, quantity: number) => api.post<CartItem>('/cart', { productId, quantity }),
  update: (itemId: string, quantity: number) => api.put<CartItem>(`/cart/${itemId}`, { quantity }),
  remove: (itemId: string) => api.delete(`/cart/${itemId}`),
  clear: () => api.delete('/cart'),
};

export const orderAPI = {
  getAll: () => api.get<Order[]>('/orders'),
  getById: (id: string) => api.get<Order>(`/orders/${id}`),
  create: (orderData: Omit<Order, 'id' | 'createdAt'>) => api.post<Order>('/orders', orderData),
  updateStatus: (id: string, status: Order['status']) => api.put<Order>(`/orders/${id}/status`, { status }),
};

export const authAPI = {
  login: (email: string, password: string, role: 'admin' | 'customer') => 
    api.post<{ token: string; user: any }>('/auth/login', { email, password, role }),
  register: (userData: any) => api.post<{ token: string; user: any }>('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const analyticsAPI = {
  getDashboard: () => api.get<Analytics>('/analytics/dashboard'),
  getSalesData: (period: string) => api.get<Array<{ date: string; sales: number }>>(`/analytics/sales/${period}`),
};

export default api;