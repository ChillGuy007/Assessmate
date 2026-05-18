#!/bin/bash
# Verification script for Assessmate setup

echo "🔍 Assessmate Setup Verification"
echo "================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
echo "Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js installed: $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js 16+"
    exit 1
fi

# Check npm
echo "Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm installed: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

echo ""
echo "Checking directory structure..."

# Check backend structure
BACKEND_FILES=(
    "backend/index.js"
    "backend/database.js"
    "backend/seed.js"
    "backend/package.json"
    "backend/.env"
    "backend/routes/auth.js"
    "backend/routes/users.js"
    "backend/routes/courses.js"
    "backend/routes/feedback.js"
    "backend/routes/analytics.js"
    "backend/middleware/auth.js"
    "backend/utils/sentiment.js"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
    fi
done

echo ""
echo "Checking frontend files..."

FRONTEND_FILES=(
    "Assessmate/src/services/api.js"
    "Assessmate/src/contexts/AuthContext.jsx"
    "Assessmate/src/pages/Login.jsx"
    "Assessmate/.env.example"
)

for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
    fi
done

echo ""
echo "Checking documentation..."

DOCS_FILES=(
    "README.md"
    "SETUP.md"
    "QUICK_REFERENCE.md"
    "docker-compose.yml"
)

for file in "${DOCS_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file (MISSING)"
    fi
done

echo ""
echo "================================="
echo -e "${GREEN}Setup verification complete!${NC}"
echo ""
echo "Next steps:"
echo "1. cd backend && npm install"
echo "2. cd backend && node seed.js"
echo "3. cd backend && npm run dev"
echo ""
echo "In another terminal:"
echo "1. cd Assessmate && npm install"
echo "2. cd Assessmate && npm run dev"
echo ""
echo "Then open: http://localhost:5173"
