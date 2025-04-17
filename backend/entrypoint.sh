#!/bin/sh

echo "🔄 Running prisma migrate deploy..."
npx prisma migrate deploy

echo "📦 Generating tsoa routes..."
npm run tsoa:gen

echo "🚀 Starting production server..."
npm start