#!/bin/bash

# Development startup script for Agentic E-commerce Backend

echo "🚀 Starting Agentic E-commerce Backend Development Server"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp env.example .env
    echo "✅ .env file created. Please update with your database credentials."
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed."
    echo ""
fi

# Check if MySQL is running (optional)
echo "🔍 Checking database connection..."
echo "   Make sure MySQL is running on localhost:3306"
echo "   Database: agentic_ecommerce"
echo ""

# Start the development server
echo "🎯 Starting development server..."
echo "   Server will be available at: http://localhost:3001"
echo "   API Base URL: http://localhost:3001/api"
echo "   Health Check: http://localhost:3001/health"
echo ""
echo "📝 Default Admin Credentials:"
echo "   Email: admin@ecoshop.com"
echo "   Password: admin123"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
