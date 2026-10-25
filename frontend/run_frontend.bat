@echo off
echo ========================================================
echo   FROM FARM TO FORK - Food Adulteration Awareness
echo   Frontend Development Server Launcher (Vite + React)
echo ========================================================
cd /d "%~dp0"

IF NOT EXIST "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

echo Starting Vite React development server on http://localhost:5173 ...
call npm run dev
pause
