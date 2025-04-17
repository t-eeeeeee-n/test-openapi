#!/bin/sh

echo "⏳ Waiting for DB..."
until nc -z db 5432; do
  sleep 1
done

echo "✅ DB ready! Running migrations..."
npx prisma migrate deploy

echo "🚀 Starting dev server..."
npm run dev