FROM php:8.3-apache

# System deps
RUN apt-get update \
    && apt-get install -y git unzip rsync libzip-dev libpq-dev libonig-dev libicu-dev libpng-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql intl zip gd \
    && a2enmod rewrite headers

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Create base Laravel app if not present
ARG APP_NAME="SportsStore"
RUN test -f artisan || (composer create-project laravel/laravel . --prefer-dist --no-interaction && php artisan key:generate)

# Apache vhost
RUN printf "<VirtualHost *:80>\n\
    DocumentRoot /var/www/html/public\n\
    <Directory /var/www/html/public>\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
</VirtualHost>\n" > /etc/apache2/sites-available/000-default.conf

# Copy overlay (controllers/routes) mounted at runtime
RUN mkdir -p /docker-backend-overlay

ENV APACHE_RUN_USER=www-data
ENV APACHE_RUN_GROUP=www-data

EXPOSE 80

CMD set -e; \
  if [ -d /docker-backend-overlay ]; then \
    rsync -a /docker-backend-overlay/ /var/www/html/ || true; \
  fi; \
  php artisan migrate --force || true; \
  php artisan db:seed --force || true; \
  apache2-foreground

