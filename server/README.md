<p align="center">
  <a href="https://brevly-ftr.vercel.app/">
    <img src="../assets/logo.svg" alt="Brev.ly - Encurtador de Links" width="300" />
  </a>
</p>

# A FTR URL Shortener Challenge App

<p align="center">
  <b>Quick Nav:</b>
  <a href="#about">About</a> •
  <a href="#live-demo">Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#structure">Structure</a>
</p>

A modern URL shortening application using React on the frontend and Node.js on the backend. Create, manage, and monitor your shortened URLs with a simple and intuitive interface.

<a id="about"></a>
## ℹ️ About

[Brev.ly](https://brevly-ftr.vercel.app/) is a URL shortening system developed during Rocketseat / FTR's Tech Developer 360 postgraduate program. Its goal is to integrate frontend, backend, and DevOps knowledge, transforming learning into a real product.

The idea is simple and efficient: register, list, and remove shortened URLs and redirect the user to the original URL, counting their clicks and thus enabling access reporting.

<a id="live-demo"></a>
## 🚀 Live Demo

Click on the badges below to access them.

**API documentation**: [![Swagger UI](https://img.shields.io/badge/Swagger_UI-729D08?logo=swagger\&logoColor=white)](http://lb-rocketseat-1923466556.us-east-2.elb.amazonaws.com/docs)

<a id="features"></a>
## ✨ Implemented Features

📌 Link Creation
- [x] Create a new shortened link
- [x] Validate the format of the shortened URL
- [x] Prevent duplicate shortened URLs

❌ Link Deletion
- [x] Delete an existing link by id

🔍 Query and Access
- [x] Get the original URL through a shortened URL
- [x] List all registered URLs
- [x] Automatically increment the access count when visiting a link

📤 CSV Export
- [x] Export all links in a CSV file
- [x] Access the CSV via CDN (e.g., Amazon S3, Cloudflare R2)
- [x] Generate a unique and random name for the file
- [x] Performance data listing
- [x] CSV structure: original URL, shortened URL, total accesses, creation date

🐋 Docker
- [x] Building a Dockerfile following best practices
- [x] Generating the application image via Docker

🛠️ Important Tips
- [x] Remember to enable CORS in the application. 

📂 CSV Example
https://pub-5412d8cac0de444f911e6a650b5bda8e.r2.dev/exports/export_csv_short_links_10967054-8734-433b-ba07-8c4fd75db086.csv

<a id="architecture"></a>
## 🏗️ Architecture

This project consists of two main applications:

- **Server Backend** (`/server`) - Node.js application with Typescript and Fastify using Docker with AWS ECR/ECS.
- **Database** - PostgreSQL database hosted at Neon.
- **CSV Files** - CSV file CDN on Cloudflare.

<a id="tech-stack"></a>
## 🛠️ Tech Stack

### Backend

| Tech | Used for | Version |
| -------------------- | ------------------------------------- | ---------------------------------------------------------------------------------- |
| Node.js              | Server runtime.                   | ![v](https://img.shields.io/badge/Node.js-v20.18-339933?logo=node.js\&logoColor=white)     |
| TypeScript           | JavaScript superset with static typing.                    | ![v](https://img.shields.io/badge/Typescript-v5.9.x-3178C6?logo=typescript\&logoColor=white)  |
| Fastify              | Fast, low-overhead web framework for Node.js.     | ![v](https://img.shields.io/badge/Fastify-v5.6.0-000000?logo=fastify\&logoColor=white)     |
| PostgreSQL                   | Driver PostgreSQL (Neon/RDS)          | ![v](https://img.shields.io/badge/PostgreSQL-v8.16.3-4169E1?logo=postgresql\&logoColor=white) |
| Drizzle           | Lightweight TypeScript ORM with typed queries and simple migrations.                   | ![v](https://img.shields.io/badge/Drizzle-v0.44.5-0A7EA4?logo=drizzle\&logoColor=white)                                  |                            |
| Zod                  | Schema validation and typing in TypeScript.                    | ![v](https://img.shields.io/badge/Zod-v4.1.8-3E67B1?logo=zod\&logoColor=white)                                   |
| AWS / Cloudflare   | S3-compatible storage (e.g., R2). | ![v](https://img.shields.io/badge/AWS_SDK-v3.888.0-FF9900?logo=cloudflare\&logoColor=white) |
| TSUP                 | Bundler for build.                 | ![v](https://img.shields.io/badge/v8.5.0-000000)                                   |
| TSX                  | Runner TS/ESM on dev                  | ![v](https://img.shields.io/badge/v4.20.5-000000)                                  |

<a id="quick-start"></a>
## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm package manager
- Docker and Docker Compose
- PostgreSQL 16 (or use Docker)

### 1. Clone and Setup

```bash
git clone https://github.com/brunofhorn/brev.ly
cd brev.ly
```

### 2. Backend Setup

```bash
cd server

# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Start database with Docker
docker-compose up -d

# Run database migrations
pnpm db:migrate

# Start development server
pnpm dev
```

The backend will be available at `http://localhost:3333`

##  API Endpoints

- `POST /links` - Create a new short link.
- `GET /links` - List all short links.
- `DELETE /links/:id` - Delete a short link by id.
- `GET /links/:shortUrl` - Get original URL by short url.
- `POST /links/export` - Export links to CSV file.
- `GET /docs` - Swagger UI for API documentation.
- `GET /health` - Route for health check.

## 🐳 Docker Deployment

### Backend with Docker

```bash
cd server

# Build and run with Docker Compose
docker-compose up -d

# Or build manually
docker build -t brevly-server .
docker run -p 3333:3333 --env-file .env brevly-server
```

<a id="structure"></a>
## 📁 Project Structure

```sh
├── server/                 # Backend API
│   ├── src/
│   │   ├── db/             # Database, schema and client
│   │   ├── errors/         # Error classes
│   │   ├── functions/      # Functions for managing actions in the database
│   │   └── lib/            # Utilities and external libs
│   │   └── routes/         # Public routes on API
│   │   └── schemas/        # Validation schemas for routes
│   │   └── shared/         # Globally shared functions
│   │   └── types/          # Class typing
└────── README.md           # This file
```

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=3333
NODE_ENV=development<environment>
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/brevly
BASE_URL=https://brev.ly
POSTGRES_PORT=5432
POSTGRES_USER=<your_user>
POSTGRES_PASSWORD=<your_password>
POSTGRES_DB=brevly
CLOUDFLARE_ACCOUNT_ID=<your_account_id>
CLOUDFLARE_ACCESS_KEY_ID=<your_access_key_id>
CLOUDFLARE_SECRET_ACCESS_KEY=<your_secret_access_key>
CLOUDFLARE_BUCKET=<your_bucket_name>
CLOUDFLARE_PUBLIC_URL=<your_public_url_bucket>
```

## 📚 Documentation

- **API Documentation**: Available at `http://localhost:3333/docs` when backend is running
- **Database GUI**: Run `pnpm db:studio` in the server directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

## 📖 Detailed Documentation

For more detailed information about each application:

- **[Web Frontend Documentation](../web/README.md)** - Complete guide for the React frontend

---

Built with ❤️ using modern web technologies.