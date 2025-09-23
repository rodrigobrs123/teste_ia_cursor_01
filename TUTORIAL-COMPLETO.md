# 🏪 TUTORIAL COMPLETO - LOJA VIRTUAL DE ESPORTES

## 🚀 PASSO A PASSO PARA CRIAR O PROJETO

### PASSO 1: Preparar o Ambiente

```bash
# Criar pasta do projeto
mkdir loja-virtual-esportes
cd loja-virtual-esportes

# Criar estrutura
mkdir backend frontend
```

### PASSO 2: Backend Laravel

```bash
cd backend

# Criar projeto Laravel
composer create-project laravel/laravel . --prefer-dist

# Configurar banco SQLite
touch database/database.sqlite

# Configurar .env (editar o arquivo)
nano .env
```

**Conteúdo do .env:**
```env
APP_NAME="Sports Store"
APP_ENV=local
APP_KEY=base64:SERÁ_GERADO_AUTOMATICAMENTE
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/caminho/absoluto/para/database.sqlite

# Resto mantém padrão...
```

### PASSO 3: Configurar Rotas API

**Editar `bootstrap/app.php`:**
```php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',  // ADICIONAR ESTA LINHA
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
```

### PASSO 4: Criar Models e Migrations

```bash
# Gerar models com migrations
php artisan make:model Category -m
php artisan make:model Product -m  
php artisan make:model CartItem -m
php artisan make:model Order -m
php artisan make:model OrderItem -m

# Gerar controllers
php artisan make:controller Api/CategoryController --resource
php artisan make:controller Api/ProductController --resource
php artisan make:controller Api/CartController
php artisan make:controller Api/OrderController

# Gerar seeders
php artisan make:seeder CategorySeeder
php artisan make:seeder ProductSeeder
```

### PASSO 5: Frontend React

```bash
cd ../frontend

# Criar projeto React
npx create-react-app . --template typescript

# Instalar dependências
npm install axios react-router-dom @types/react-router-dom tailwindcss @tailwindcss/forms @tailwindcss/typography @heroicons/react lucide-react react-hot-toast

# Configurar Tailwind
npx tailwindcss init -p
```

### PASSO 6: Executar Projeto

```bash
# Backend (Terminal 1)
cd backend
php artisan key:generate
php artisan migrate --seed
php artisan serve --host=0.0.0.0 --port=8000

# Frontend (Terminal 2)  
cd frontend
npm start
```

## 📁 ARQUIVOS IMPORTANTES

Agora vou mostrar o conteúdo de cada arquivo principal...

---

## 🗄️ MIGRATIONS

### `database/migrations/create_categories_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
```

### `database/migrations/create_products_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('sku')->unique();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('manage_stock')->default(true);
            $table->boolean('in_stock')->default(true);
            $table->boolean('featured')->default(false);
            $table->json('images')->nullable();
            $table->json('specifications')->nullable();
            $table->string('brand')->nullable();
            $table->string('size')->nullable();
            $table->string('color')->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
```

---

## 🎯 PRÓXIMOS PASSOS

1. **Copie este tutorial**
2. **Execute passo a passo no seu terminal**
3. **Depois te mostro os arquivos de código**
4. **Cole cada arquivo no lugar correto**

Quer que eu continue com os próximos arquivos? 🤔