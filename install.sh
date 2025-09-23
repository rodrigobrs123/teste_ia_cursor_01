#!/bin/bash

echo "🏪 === INSTALAÇÃO LOJA VIRTUAL DE ESPORTES ==="
echo ""

# Verificar se está no diretório correto
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Execute este script na pasta raiz do projeto!"
    exit 1
fi

echo "📦 Instalando dependências do backend..."
cd backend

# Verificar se composer existe
if ! command -v composer &> /dev/null; then
    echo "❌ Composer não encontrado! Instale o Composer primeiro."
    echo "   Visite: https://getcomposer.org/download/"
    exit 1
fi

# Instalar dependências PHP
composer install --no-dev --optimize-autoloader

# Configurar ambiente
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Arquivo .env criado"
fi

# Gerar chave da aplicação
php artisan key:generate

# Criar banco SQLite
touch database/database.sqlite
echo "✅ Banco SQLite criado"

# Configurar .env para SQLite
sed -i 's/DB_CONNECTION=mysql/DB_CONNECTION=sqlite/' .env
sed -i 's/DB_HOST=.*//' .env
sed -i 's/DB_PORT=.*//' .env
sed -i 's/DB_DATABASE=.*/DB_DATABASE=\/caminho\/para\/database.sqlite/' .env
sed -i 's/DB_USERNAME=.*//' .env
sed -i 's/DB_PASSWORD=.*//' .env

# Executar migrations
php artisan migrate --force
echo "✅ Migrations executadas"

# Executar seeders
php artisan db:seed --force
echo "✅ Dados de exemplo inseridos"

cd ../

echo ""
echo "⚛️ Instalando dependências do frontend..."
cd frontend

# Verificar se npm existe
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm não encontrado! Instale o Node.js primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

# Instalar dependências
npm install
echo "✅ Dependências React instaladas"

cd ../

echo ""
echo "🎉 === INSTALAÇÃO CONCLUÍDA! ==="
echo ""
echo "🚀 Para iniciar a aplicação:"
echo ""
echo "1️⃣ Backend (Terminal 1):"
echo "   cd backend"
echo "   php artisan serve --host=0.0.0.0 --port=8000"
echo ""
echo "2️⃣ Frontend (Terminal 2):"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "3️⃣ Acessar:"
echo "   Frontend: http://localhost:3000"
echo "   API: http://localhost:8000/api"
echo ""
echo "✨ Divirta-se comprando produtos esportivos!"