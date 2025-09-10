@echo off
REM Development startup script for Agentic E-commerce Backend (Windows)

echo 🚀 Starting Agentic E-commerce Backend Development Server
echo ==================================================

REM Check if .env file exists
if not exist .env (
    echo ⚠️  .env file not found. Creating from template...
    copy env.example .env
    echo ✅ .env file created. Please update with your database credentials.
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
    echo ✅ Dependencies installed.
    echo.
)

REM Check if MySQL is running (optional)
echo 🔍 Checking database connection...
echo    Make sure MySQL is running on localhost:3306
echo    Database: agentic_ecommerce
echo.

REM Start the development server
echo 🎯 Starting development server...
echo    Server will be available at: http://localhost:3001
echo    API Base URL: http://localhost:3001/api
echo    Health Check: http://localhost:3001/health
echo.
echo 📝 Default Admin Credentials:
echo    Email: admin@ecoshop.com
echo    Password: admin123
echo.
echo 🛑 Press Ctrl+C to stop the server
echo.

npm run dev
