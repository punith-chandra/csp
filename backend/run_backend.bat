@echo off
echo ========================================================
echo   FROM FARM TO FORK - Food Adulteration Awareness
echo   Backend Server Launcher (FastAPI + SQLite)
echo ========================================================
cd /d "%~dp0"

IF EXIST "C:\Users\hp\AppData\Local\Python\bin\python.exe" (
    set "PY_CMD=C:\Users\hp\AppData\Local\Python\bin\python.exe"
) ELSE (
    set "PY_CMD=python"
)

echo Starting FastAPI server on http://localhost:8000 ...
"%PY_CMD%" -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
