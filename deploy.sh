#!/bin/bash

# MyCrew Self-Hosted Deployment Script
# Run this on your server (100.98.72.30)

set -e

echo "🚀 MyCrew Deployment Starting..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create necessary directories
echo "Creating directories..."
mkdir -p uploads
mkdir -p nginx/ssl
mkdir -p postgres-data
mkdir -p redis-data
mkdir -p minio-data

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.production .env
    echo "⚠️  Please edit .env file with your actual credentials before starting!"
    exit 1
fi

# Build and start services
echo "Building Docker images..."
docker-compose build

echo "Starting services..."
docker-compose up -d

# Wait for database to be ready
echo "Waiting for database..."
sleep 5

# Run database migrations
echo "Running database migrations..."
docker-compose exec -T mycrew npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
docker-compose exec -T mycrew npx prisma generate

echo ""
echo "✅ MyCrew deployed successfully!"
echo ""
echo "📱 Access your site:"
echo "   - Main app: http://100.98.72.30:3005"
echo "   - MinIO console: http://100.98.72.30:9001"
echo "   - WebSocket: ws://100.98.72.30:3006"
echo ""
echo "📊 View logs: docker-compose logs -f"
echo "🛑 Stop: docker-compose down"
echo "🔄 Restart: docker-compose restart"
