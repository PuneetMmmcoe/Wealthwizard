#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js v20 or later."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    echo "DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[dbname]" > .env
    echo "Please update the DATABASE_URL in .env with your PostgreSQL credentials"
fi

# Push database schema
echo "Setting up database..."
npm run db:push

echo "Setup complete! You can now run 'npm run dev' to start the application."
