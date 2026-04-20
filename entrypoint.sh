#!/bin/sh

set -e

# Create .env file with DATABASE_URL if not exists (for Prisma CLI)
if [ -n "$DATABASE_URL" ]; then
  echo "DATABASE_URL=$DATABASE_URL" > /app/.env.local
  echo "Running Prisma migrations..."
  
  # Try to run migrations, but don't fail if they're already applied
  npx prisma migrate deploy --schema=/app/prisma/schema.prisma 2>&1 || {
    echo "⚠ Migrations skipped (may already be applied or DB unreachable)"
  }
else
  echo "⚠ DATABASE_URL not set, skipping migrations"
fi

# Start the application
echo "✓ Starting application..."
npm start
