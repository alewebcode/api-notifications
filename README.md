# 📬 Api Notificação - Backend

Este projeto é um **backend Node.js** com **Express**, **MongoDB**, **Redis**, **Docker**, autenticação JWT, notificações e testes. Abaixo está um guia completo com todas as configurações implementadas até agora.

---

# 🚀 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript**
- **MongoDB + Mongoose + Mongo Memory Server**
- **Redis (ioredis)**
- **JWT Autenticação**
- **Zod** – validação de entrada
- **Jest + Supertest**
- **Docker + Docker Compose**

---

Execução:

# 🔍 Testando a aplicação via Docker

Configurar .env

```bash

PORT=3000
MONGO_URI=mongodb://mongo:27017/notifications_db
NODE_ENV=development
JWT_SECRET=api-notification
REDIS_HOST=redis
REDIS_PORT=6379

```

Suba os containers e execute o seed de usuários

**Foram criados 2 usuários que são inseridos através do seed com o "user1@user1.com" e "user2@user2.com" ambos com a senha 123456**

```bash
docker compose up -d
docker compose exec app npm run seed:users

```

Testar API com Insomnia / Postman:

- `POST /authenticate` - Autenticar usuário
- `POST /notifications` - Criar notificação
- `GET /notifications?page=1&limit=10` - Listar notificações
- `PATCH /notifications/:id/read` - Marcar notificação como lida
- `DELETE /notifications/:id` - Deletar notificação(soft delete)
- `GET /notifications/unread` - Obter notificações não lidas

---

# 🧪 Testes (Jest + Supertest + Mongo Memory Server)

- Testes de integração com Mongo em memória
- Testes de criacão de notificação e marcação de notificação como lida

Para executar o teste basta seguir as instruções abaixo

Configurar .env local

```bash

PORT=3000
MONGO_URI=mongodb://localhost:27017/notifications_db
NODE_ENV=development
JWT_SECRET=api-notification
REDIS_HOST=localhost
REDIS_PORT=6379

```

Executar local

```bash
npm run dev
```

```bash

docker compose -d

```

```bash
npm run test
```

---

# 📘 Conclusão

Este backend fornece:

- CRUD completo de notificações
- Soft delete
- Paginação
- Contagem com Redis
- Validação com Zod
- Testes com Jest + Supertest + Memory Server
- Docker completo com Mongo e Redis
