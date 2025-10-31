@echo off
REM Recipe Book Project Startup Script
REM This script starts both backend and frontend servers

echo.
echo ===================================
echo   Recipe Book - Project Startup
echo ===================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed
echo.

REM Start Backend
echo Starting Backend Server...
echo.
start "Recipe Book Backend" cmd /k "cd /d F:\web\ tech\Recipe-Book\backend && node server.js"

REM Wait a moment for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo Starting Frontend Development Server...
echo.
start "Recipe Book Frontend" cmd /k "cd /d F:\web\ tech\Recipe-Book\frontend && npm run dev"

REM Wait a moment for frontend to start
timeout /t 2 /nobreak

echo.
echo ===================================
echo   Servers Starting...
echo ===================================
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173 or http://localhost:5174
echo.
echo Press any key to close this window...
pause
