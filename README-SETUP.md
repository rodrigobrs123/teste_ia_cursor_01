# 🏪 Loja Virtual de Esportes - Setup Local

## 📋 Pré-requisitos

- **Node.js** (versão 18+)
- **PHP** (versão 8.1+)
- **Composer**
- **MySQL** (opcional, pode usar SQLite)

## 🚀 Instalação

### 1️⃣ Backend (Laravel)

```bash
cd backend

# Instalar dependências PHP
composer install

# Copiar arquivo de configuração
cp .env.example .env

# Gerar chave da aplicação
php artisan key:generate

# Para SQLite (mais simples)
touch database/database.sqlite

# Configurar .env para SQLite
DB_CONNECTION=sqlite
DB_DATABASE=/caminho/completo/para/database.sqlite

# Executar migrations e seeders
php artisan migrate --seed

# Iniciar servidor
php artisan serve --host=0.0.0.0 --port=8000
```

### 2️⃣ Frontend (React)

```bash
cd frontend

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start
```

## 🌐 Acessar a Aplicação

- **Frontend:** http://localhost:3000
- **API:** http://localhost:8000/api

## 🛠️ Configuração MySQL (Opcional)

Se preferir usar MySQL:

```bash
# Criar banco de dados
mysql -u root -p
CREATE DATABASE sports_store;
CREATE USER 'laravel'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON sports_store.* TO 'laravel'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Configurar .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sports_store
DB_USERNAME=laravel
DB_PASSWORD=password
```

## 🐳 Docker (Alternativa)

```bash
# Subir todos os serviços
docker-compose up -d

# Executar migrations
docker-compose exec laravel php artisan migrate --seed
```

## 📁 Estrutura do Projeto

```
projeto/
├── backend/          # API Laravel
├── frontend/         # App React
├── docker-compose.yml
└── README.md
```

## ✨ Funcionalidades

- ✅ Catálogo de produtos esportivos
- ✅ Sistema de categorias
- ✅ Carrinho de compras
- ✅ Checkout completo
- ✅ Integração Nuvem Pago (simulada)
- ✅ Design responsivo
- ✅ API REST completa

## 🎯 Produtos de Exemplo

- Chuteiras Nike Mercurial
- Bola Adidas Champions League  
- Tênis Air Jordan Retro
- Tênis Nike Air Zoom Pegasus
- Whey Protein Concentrado
- E mais...

## 🆘 Problemas Comuns

**Erro de permissão Laravel:**
```bash
chmod -R 775 storage bootstrap/cache
```

**Erro de extensão PHP:**
```bash
# Ubuntu/Debian
sudo apt install php-sqlite3 php-mbstring php-xml

# CentOS/RHEL
sudo yum install php-pdo php-mbstring php-xml
```

**Porta em uso:**
```bash
# Verificar processos usando a porta
lsof -i :3000
lsof -i :8000

# Matar processo se necessário
kill -9 PID
```

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs do Laravel: `tail -f storage/logs/laravel.log`
2. Verifique o console do React no browser (F12)
3. Confirme se todas as dependências estão instaladas