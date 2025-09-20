#!/usr/bin/env sh
set -e

APP_DIR=/var/www/html

if [ ! -f "$APP_DIR/artisan" ]; then
  echo "[entrypoint] Creating Laravel app..."
  composer create-project laravel/laravel "$APP_DIR" --no-interaction
fi

cd "$APP_DIR"

if [ ! -f .env ]; then
  echo "[entrypoint] Setting up .env from example"
  cp .env.example .env
  sed -i "s#APP_URL=.*#APP_URL=${APP_URL:-http://localhost:8080}#" .env || true
  sed -i "s/DB_CONNECTION=.*/DB_CONNECTION=${DB_CONNECTION:-mysql}/" .env || true
  sed -i "s/DB_HOST=.*/DB_HOST=${DB_HOST:-db}/" .env || true
  sed -i "s/DB_PORT=.*/DB_PORT=${DB_PORT:-3306}/" .env || true
  sed -i "s/DB_DATABASE=.*/DB_DATABASE=${DB_DATABASE:-sports_shop}/" .env || true
  sed -i "s/DB_USERNAME=.*/DB_USERNAME=${DB_USERNAME:-shop}/" .env || true
  sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD:-shop}/" .env || true
  # Extra envs
  if ! grep -q "^FRONTEND_URL=" .env; then echo "FRONTEND_URL=${FRONTEND_URL:-http://localhost:5173}" >> .env; else sed -i "s#^FRONTEND_URL=.*#FRONTEND_URL=${FRONTEND_URL:-http://localhost:5173}#" .env; fi
  if ! grep -q "^NUVEM_PAGO_API_URL=" .env; then echo "NUVEM_PAGO_API_URL=${NUVEM_PAGO_API_URL:-https://api.sandbox.nuvempago.com/v1}" >> .env; else sed -i "s#^NUVEM_PAGO_API_URL=.*#NUVEM_PAGO_API_URL=${NUVEM_PAGO_API_URL:-https://api.sandbox.nuvempago.com/v1}#" .env; fi
  if ! grep -q "^NUVEM_PAGO_API_KEY=" .env; then echo "NUVEM_PAGO_API_KEY=${NUVEM_PAGO_API_KEY:-changeme}" >> .env; else sed -i "s#^NUVEM_PAGO_API_KEY=.*#NUVEM_PAGO_API_KEY=${NUVEM_PAGO_API_KEY:-changeme}#" .env; fi
fi

echo "[entrypoint] Copying app overrides..."
if [ -d /opt/app-overrides ]; then
  for dir in app config routes database; do
    if [ -d "/opt/app-overrides/$dir" ]; then
      cp -R "/opt/app-overrides/$dir" "$APP_DIR"/
    fi
  done
fi

echo "[entrypoint] Installing PHP dependencies..."
composer install --no-interaction --prefer-dist || true

composer require guzzlehttp/guzzle --no-interaction || true

echo "[entrypoint] Generating app key..."
php artisan key:generate --force || true

echo "[entrypoint] Running migrations and seed..."
php artisan migrate --force || true
php artisan db:seed --force || true

echo "[entrypoint] Fixing permissions..."
chown -R www-data:www-data storage bootstrap/cache || true

echo "[entrypoint] Starting php-fpm"
exec php-fpm

