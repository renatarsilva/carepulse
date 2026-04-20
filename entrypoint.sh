#!/bin/sh

# Run database migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  npx prisma migrate deploy
  if [ $? -eq 0 ]; then
    echo "✓ Migrations completed successfully"
  else
    echo "⚠ Migrations failed or already up to date"
  fi
else
  echo "⚠ DATABASE_URL not set, skipping migrations"
fi

# Start the application
echo "Starting application..."
npm start
