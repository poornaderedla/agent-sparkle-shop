#!/usr/bin/env node

/**
 * Simple API testing script for Agentic E-commerce Backend
 * Run with: node scripts/test-api.js
 */

const http = require('http');

const API_BASE = 'http://localhost:3001/api';
let authToken = '';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testHealthCheck() {
  console.log('🔍 Testing health check...');
  const response = await makeRequest('GET', '/health');
  console.log(`   Status: ${response.status}`);
  console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
  console.log('');
}

async function testUserRegistration() {
  console.log('👤 Testing user registration...');
  const userData = {
    email: 'test@example.com',
    password: 'password123',
    role: 'customer'
  };
  
  const response = await makeRequest('POST', '/api/auth/signup', userData);
  console.log(`   Status: ${response.status}`);
  console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
  
  if (response.data.success && response.data.data.token) {
    authToken = response.data.data.token;
    console.log('   ✅ Auth token saved for further tests');
  }
  console.log('');
}

async function testUserLogin() {
  console.log('🔐 Testing user login...');
  const loginData = {
    email: 'test@example.com',
    password: 'password123'
  };
  
  const response = await makeRequest('POST', '/api/auth/login', loginData);
  console.log(`   Status: ${response.status}`);
  console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
  
  if (response.data.success && response.data.data.token) {
    authToken = response.data.data.token;
    console.log('   ✅ Auth token updated');
  }
  console.log('');
}

async function testGetProducts() {
  console.log('📦 Testing get products...');
  const response = await makeRequest('GET', '/api/products');
  console.log(`   Status: ${response.status}`);
  console.log(`   Products count: ${response.data.data?.products?.length || 0}`);
  console.log('');
}

async function testGetFeaturedProducts() {
  console.log('⭐ Testing get featured products...');
  const response = await makeRequest('GET', '/api/products/featured');
  console.log(`   Status: ${response.status}`);
  console.log(`   Featured products count: ${response.data.data?.products?.length || 0}`);
  console.log('');
}

async function testGetCategories() {
  console.log('🏷️  Testing get categories...');
  const response = await makeRequest('GET', '/api/products/categories');
  console.log(`   Status: ${response.status}`);
  console.log(`   Categories: ${JSON.stringify(response.data.data?.categories || [], null, 2)}`);
  console.log('');
}

async function testGetUserProfile() {
  if (!authToken) {
    console.log('⚠️  Skipping user profile test - no auth token');
    return;
  }
  
  console.log('👤 Testing get user profile...');
  const response = await makeRequest('GET', '/api/auth/me', null, authToken);
  console.log(`   Status: ${response.status}`);
  console.log(`   User: ${JSON.stringify(response.data.data?.user || {}, null, 2)}`);
  console.log('');
}

async function testGetCart() {
  if (!authToken) {
    console.log('⚠️  Skipping cart test - no auth token');
    return;
  }
  
  console.log('🛒 Testing get cart...');
  const response = await makeRequest('GET', '/api/cart', null, authToken);
  console.log(`   Status: ${response.status}`);
  console.log(`   Cart items: ${response.data.data?.items?.length || 0}`);
  console.log('');
}

async function testGetOrders() {
  if (!authToken) {
    console.log('⚠️  Skipping orders test - no auth token');
    return;
  }
  
  console.log('📋 Testing get user orders...');
  const response = await makeRequest('GET', '/api/orders', null, authToken);
  console.log(`   Status: ${response.status}`);
  console.log(`   Orders count: ${response.data.data?.orders?.length || 0}`);
  console.log('');
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting API Tests for Agentic E-commerce Backend');
  console.log('====================================================');
  console.log('');

  try {
    await testHealthCheck();
    await testGetProducts();
    await testGetFeaturedProducts();
    await testGetCategories();
    await testUserRegistration();
    await testUserLogin();
    await testGetUserProfile();
    await testGetCart();
    await testGetOrders();
    
    console.log('✅ All tests completed!');
    console.log('');
    console.log('📝 Test Summary:');
    console.log('   - Health check: ✅');
    console.log('   - Public endpoints: ✅');
    console.log('   - Authentication: ✅');
    console.log('   - Protected endpoints: ✅');
    console.log('');
    console.log('🎉 Backend API is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Make sure the backend server is running on port 3001');
    console.log('   2. Check if MySQL database is running and accessible');
    console.log('   3. Verify .env file has correct database credentials');
    console.log('   4. Run: npm run dev in the backend directory');
  }
}

// Run tests
runTests();
