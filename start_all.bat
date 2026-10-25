@echo off
echo =======================================================================
echo     FROM FARM TO FORK - Food Adulteration Awareness Web Platform
echo     Sri Vasavi Engineering College (Autonomous) - Dept of CSE
echo =======================================================================
echo.
echo Launching Backend Server (FastAPI + SQLite)...
start "FarmToFork Backend" "%~dp0backend\run_backend.bat"

timeout /t 3 /nobreak >nul

echo Launching Frontend Development Server (React + Vite)...
start "FarmToFork Frontend" "%~dp0frontend\run_frontend.bat"

echo.
echo =======================================================================
echo Platform launched successfully!
echo - Backend API:  http://localhost:8000 (Docs: http://localhost:8000/docs)
echo - Frontend Web: http://localhost:5173
echo =======================================================================
timeout /t 5
