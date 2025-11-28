#!/bin/bash

echo "🚀 Starting Urban Nexus (Vite + PostgreSQL)..."
echo ""
echo "⚠️  IMPORTANT: Make sure PostgreSQL is running in pgAdmin!"
echo ""

# Start Node Service
echo "📦 Starting Node Service..."
cd backend/node-service
npm run dev &
NODE_PID=$!
cd ../..

sleep 3

# Start AI Service
echo "🤖 Starting AI Service..."
cd backend/ai-service
source venv/bin/activate
python app/main.py &
AI_PID=$!
cd ../..

sleep 2

# Start Frontend (Vite)
echo "🎨 Starting Frontend (Vite)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ All services started!"
echo ""
echo "📍 Service URLs:"
echo "   Frontend:      http://localhost:3000"
echo "   Node Service:  http://localhost:5000/api/health"
echo "   AI Service:    http://localhost:8000/health"
echo ""
echo "🗄️  Database: PostgreSQL (via connection string)"
echo "💡 Tables will be auto-created on first run"
echo ""
echo "Press Ctrl+C to stop all services"

trap "echo ''; echo '🛑 Stopping all services...'; kill $NODE_PID $AI_PID $FRONTEND_PID 2>/dev/null; exit" INT

wait