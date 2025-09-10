const axios = require('axios');

async function testAuth() {
  try {
    console.log('Testing backend connectivity...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // Test login with demo user
    console.log('\nTesting login with demo user...');
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'demo@user.com',
      password: 'password123',
      role: 'customer'
    });
    console.log('✅ Login successful:', loginResponse.data);
    
    // Test /auth/me with token
    const token = loginResponse.data.data.token;
    const meResponse = await axios.get('http://localhost:3001/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ /auth/me successful:', meResponse.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAuth();
