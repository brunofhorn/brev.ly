<div style="text-align:center">
  <a href="https://brevly-ftr.vercel.app/">
    <img src="assets/logo.svg" alt="Brev.ly - Encurtador de Links" width="300">
  </a>
</div>

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

**Web Application**: [![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel\&logoColor=white)](https://brevly-ftr.vercel.app/)
**API documentation**: [![Swagger UI](https://img.shields.io/badge/Swagger_UI-729D08?logo=swagger\&logoColor=white)](http://lb-rocketseat-1923466556.us-east-2.elb.amazonaws.com/docs)
**Figma**: [![Figma](https://img.shields.io/badge/Figma-FF3D3D?logo=figma\&logoColor=white)](https://www.figma.com/design/38Z1s9VnoA1kB4xPv1IQBd/Encurtador-de-Links--Community-?node-id=0-1&m=dev&t=k6jeOmvV7h9NzLTt-1)

<a id="features"></a>
## ✨ Features

🔗 **Custom URL Shortening**: Create custom short links with your own codes.
📈 **Real-Time Click Tracking**: Monitor how many times each link has been clicked.
⚙️ **Link Management**: Copy and remove all your created links.
📤 **CSV Export**: Download your links data as a CSV file.
🔔 **Real-time Updates**: Instant feedback with toast notifications.
📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
🧰 **API REST with Documentation**: Full API for integration and interactive Swagger UI for developers.

<a id="architecture"></a>
## 🏗️ Architecture

This project consists of two main applications:

- **Web Frontend** (`/web`) - React + Vite application, using Typescript and hosted on Vercel.
- **Server Backend** (`/server`) - Node.js application with Typescript and Fastify using Docker with AWS ECR/ECS.
- **Database** - PostgreSQL database hosted at Neon.
- **CSV Files** - CSV file CDN on Cloudflare.

<a id="tech-stack"></a>
## 🛠️ Tech Stack

### Frontend


| Tech | Used for | Version |
| ------------------------------ | ------------------------------- | ------------------------------------------------------------------------------------- |
| React                          | JavaScript library for building user interfaces with reusable components and efficient DOM updating.  | ![React](https://img.shields.io/badge/React-v19.1.1-61DAFB?logo=react\&logoColor=white)         |
| TypeScript                     | JavaScript superset with static typing.       | [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.x-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)     |
| Vite                           | Fast dev server and bundler for modern web apps.            | ![v](https://img.shields.io/badge/Vite-v7.1.2-646CFF?logo=vite\&logoColor=white)           |
| Tailwind CSS                   | Utility CSS framework for styling with ready-made classes. | ![v](https://img.shields.io/badge/Tailwind_CSS-v4.1.13-06B6D4?logo=tailwindcss\&logoColor=white)   |
| React Hook Form                | Performative forms with hooks for React.      | ![v](https://img.shields.io/badge/React_Hook_Form-v7.62.0-EC5990?logo=reacthookform\&logoColor=white) |
| Zod                            | Schema validation and typing in TypeScript.             | ![v](https://img.shields.io/badge/Zod-v4.1.8-3E67B1?logo=zod\&logoColor=white)                                      |
| React Router DOM               | Declarative routing for SPAs in React.                  | ![v](https://img.shields.io/badge/React_Router_DOM-v7.8.2-CA4245?logo=reactrouter\&logoColor=white)    |
| Axios                          | Promise-based HTTP client for requests.                | ![v](https://img.shields.io/badge/Axios-v1.12.2-5A29E4?logo=axios\&logoColor=white)         |
| Radix UI | Accessible, unstyled UI primitives for React.     | ![v](https://img.shields.io/badge/Radix_UI-v1.1.15-111111?logo=radixui\&logoColor=white)                         |
| Sonner                         | Toast/notification library for React.    | ![v](https://img.shields.io/badge/Sonner-v2.0.7-111111?logo=sonner\&logoColor=white)                                      |


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

### 3. Frontend Setup

```bash
cd web

# Copy environment file
cp .env.example .env

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:5173`

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
├── assets/                 # Assets for README projects
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
├── web/                    # Frontend application
│   ├── src/
│   │   ├── assets/         # Imagens on frontend application
│   │   ├── components/     # React components
│   │   ├── contexts/       # Contexts used to share data
│   │   ├── helpers/        # Functions to assist formatting
│   │   ├── lib/            # Utilities and external libs
│   │   ├── pages/          # Page components
│   │   ├── routes/         # Routing files
│   │   ├── schemas/        # Validation schemas
│   │   ├── services/       # Functions for calling API
│   │   ├── types/          # Class typing
│   └── public/             # Static assets
└── README.md               # This file
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

### Frontend (.env)

```env
VITE_BASE_URL="http://localhost:5173
VITE_API_BASE="http://localhost:3333
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

- **[Web Frontend Documentation](./web/README.md)** - Complete guide for the React frontend
- **[Server Backend Documentation](./server/README.md)** - Complete guide for the Node.js backend

---

Built with ❤️ using modern web technologies.