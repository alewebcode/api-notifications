# 📬 Api Notification - Backend

Este projeto é um **backend Node.js** com **Express**, **MongoDB**, **Redis**, **Docker**, autenticação JWT, notificações e testes. Abaixo está um guia completo com todas as configurações implementadas até agora.

---

# 🚀 Tecnologias Utilizadas

- **Node.js + Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **Redis (ioredis)**
- **JWT Autenticação**
- **Zod** – validação de entrada
- **Jest + Supertest**
- **Docker + Docker Compose**

---

# 🧪 Testes (Jest + Supertest + Mongo Memory Server)

- Testes de integração com Mongo em memória
- Testes de creation, listing e read
- JWT gerado no teste

Execução:

# 🔍 Testando a aplicação via Docker

Suba os containers e execute o seed de usuários

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

# 📘 Conclusão

Este backend fornece:

- CRUD completo de notificações
- Soft delete
- Paginação
- Contagem otimizada com Redis
- Validação com Zod
- Testes com Jest + Supertest + Memory Server
- Docker completo com Mongo e Redis
