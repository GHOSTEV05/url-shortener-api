# URL Shortener API

A production-ready REST API built with **Node.js**, **Express**, **Prisma ORM**, and **PostgreSQL** for creating, managing, and tracking shortened URLs.

The API allows users to generate short URLs, redirect visitors, track click statistics, search and paginate links, and manage them through documented REST endpoints.

---

## 🚀 Live Demo

- **API:** https://url-shortener-api-2dwm.onrender.com/
- **Swagger Documentation:** https://url-shortener-api-2dwm.onrender.com/api-docs
- **GitHub Repository:** https://github.com/GHOSTEV05/url-shortener-api

---

## ✨ Features

- Create shortened URLs
- Automatic unique short code generation
- HTTP redirection
- Click tracking
- Last visit timestamp
- Link statistics
- List all shortened URLs
- Pagination
- Search by original URL
- Delete shortened URLs
- Request validation with Zod
- Global error handling
- Swagger API documentation
- PostgreSQL database with Prisma ORM
- Cloud deployment using Render and Neon

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Neon Database
- Zod
- Swagger UI
- Swagger JSDoc
- Render

---

## 📂 Project Structure

```
src/
├── controllers/
├── docs/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js

prisma/
├── migrations/
└── schema.prisma
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/GHOSTEV05/url-shortener-api.git
```

Go to the project

```bash
cd url-shortener-api
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run migrations

```bash
npx prisma migrate dev
```

Start the development server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

DATABASE_URL="postgresql://username:password@localhost:5432/url_shortener"

```

---

## 📖 API Endpoints

### Create Short URL

```
POST /api/v1/links
```

Request

```json
{
  "url": "https://google.com"
}
```

---

### Get All Links

```
GET /api/v1/links
```

Supports:

- page
- limit
- search

Example

```
GET /api/v1/links?page=1&limit=10&search=google
```

---

### Get Link Statistics

```
GET /api/v1/links/:shortCode
```

---

### Delete Link

```
DELETE /api/v1/links/:shortCode
```

---

### Redirect

```
GET /:shortCode
```

Redirects the user to the original URL.

---

## 📊 Example Response

```json
{
  "success": true,
  "data": {
    "originalUrl": "https://google.com",
    "shortCode": "5YiQFTd",
    "shortUrl": "https://url-shortener-api-2dwm.onrender.com/5YiQFTd",
    "clicks": 15,
    "createdAt": "...",
    "lastVisitedAt": "..."
  }
}
```

---

## 📄 Swagger Documentation

Interactive API documentation is available at:

https://url-shortener-api-2dwm.onrender.com/api-docs

---

## ☁️ Deployment

The application is deployed using:

- Render (Backend)
- Neon (PostgreSQL Database)

---

## 👨‍💻 Author

**Santiago Escobar**

GitHub:
https://github.com/GHOSTEV05