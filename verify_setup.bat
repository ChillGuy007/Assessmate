@echo off
REM Verification script for Assessmate setup (Windows)

setlocal enabledelayedexpansion

echo 0x1F50D Assessmate Setup Verification
echo ====================================
echo.

REM Check Node.js
echo Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: !NODE_VERSION!
) else (
    echo [ERROR] Node.js not found. Please install Node.js 16+
    exit /b 1
)

REM Check npm
echo Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo [OK] npm installed: !NPM_VERSION!
) else (
    echo [ERROR] npm not found
    exit /b 1
)

echo.
echo Checking directory structure...
echo.

REM Check backend files
setlocal enabledelayedexpansion
set "backend_files=backend\index.js backend\database.js backend\seed.js backend\package.json backend\.env backend\routes\auth.js backend\routes\users.js backend\routes\courses.js backend\routes\feedback.js backend\routes\analytics.js backend\middleware\auth.js backend\utils\sentiment.js"

for %%F in (!backend_files!) do (
    if exist "%%F" (
        echo [OK] %%F
    ) else (
        echo [MISSING] %%F
    )
)

echo.
echo Checking frontend files...

set "frontend_files=Assessmate\src\services\api.js Assessmate\src\contexts\AuthContext.jsx Assessmate\src\pages\Login.jsx Assessmate\.env.example"

for %%F in (!frontend_files!) do (
    if exist "%%F" (
        echo [OK] %%F
    ) else (
        echo [MISSING] %%F
    )
)

echo.
echo Checking documentation...

set "docs_files=README.md SETUP.md QUICK_REFERENCE.md docker-compose.yml"

for %%F in (!docs_files!) do (
    if exist "%%F" (
        echo [OK] %%F
    ) else (
        echo [MISSING] %%F
    )
)

echo.
echo ====================================
echo Setup verification complete!
echo.
echo Next steps:
echo.
echo Terminal 1 (Backend):
echo   cd backend
echo   npm install
echo   node seed.js
echo   npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd Assessmate
echo   npm install
echo   npm run dev
echo.
echo Then open: http://localhost:5173
echo.

endlocal
