## Sports Shop - Loja virtual (React + Laravel + MySQL + Docker)

### Requisitos
- Docker e Docker Compose instalados

### Subir a stack
1. Ajuste a variável NUVEM_PAGO_API_KEY no `docker-compose.yml` (sandbox ou prod).
2. Rode:
```bash
docker compose up -d --build
```

Isso sobe:
- db (MySQL 8)
- backend (PHP-FPM + Laravel via entrypoint)
- nginx (expondo http://localhost:8080)
- frontend (Vite em http://localhost:5173)

O entrypoint do backend cria o Laravel, aplica migrations e seeds automáticos e configura `.env`.

### URLs
- API base: `http://localhost:8080/api`
- Frontend: `http://localhost:5173`

### Fluxo
1. Home lista produtos (seed).
2. Clique em um produto para ver detalhes.
3. Adicione ao carrinho, ajuste quantidades no carrinho.
4. Siga para checkout e inicie pagamento pela Nuvem Pago.
5. Após sucesso, o provedor chama webhook e o pedido muda para `paid`.

### Variáveis importantes
- FRONTEND_URL (default `http://localhost:5173`)
- NUVEM_PAGO_API_URL (default sandbox)
- NUVEM_PAGO_API_KEY (coloque sua chave)

### Desenvolvimento
Logs do backend:
```bash
docker compose logs -f backend
```

Se precisar recriar o Laravel limpo:
```bash
docker compose down -v
docker compose up -d --build
```

# teste_ia_cursor_01
