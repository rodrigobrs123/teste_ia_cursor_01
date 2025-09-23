# 🏪 LOJA VIRTUAL DE ESPORTES - CÓDIGO COMPLETO

## 📋 ESTRUTURA DO PROJETO

```
loja-virtual-esportes/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Models/
│   │   └── Http/Controllers/Api/
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── routes/
│   └── config/
├── frontend/                # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   └── types/
│   └── public/
└── docker-compose.yml
```

## 🚀 INSTRUÇÕES DE CRIAÇÃO

### 1. Criar Backend Laravel

```bash
mkdir loja-virtual-esportes
cd loja-virtual-esportes
mkdir backend frontend

# Backend
cd backend
composer create-project laravel/laravel . --prefer-dist
```

### 2. Configurar .env (Backend)

```env
APP_NAME="Sports Store"
APP_ENV=local
APP_KEY=base64:GERAR_COM_php_artisan_key:generate
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite
DB_DATABASE=/caminho/completo/para/database.sqlite

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SAME_SITE=lax

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

### 3. Criar Frontend React

```bash
cd ../frontend
npx create-react-app . --template typescript
npm install axios react-router-dom @types/react-router-dom tailwindcss @tailwindcss/forms @tailwindcss/typography @heroicons/react lucide-react react-hot-toast
```

## 📂 ARQUIVOS PRINCIPAIS

Vou listar os arquivos mais importantes abaixo...