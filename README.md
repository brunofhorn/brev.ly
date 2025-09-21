# [Brev.ly](https://brevly-ftr.vercel.app/) - A FTR URL Shortener Challenge App

![Encurtador de Links - Projeto de pós-graduação](assets/cover-readme.png)

A modern URL shortener application with a React frontend and Node.js backend. Create, manage, and track your shortened links with a clean interface and powerful analytics.

## 🚀 Live Demo

**Try it out**: [https://brevly-ftr.vercel.app/](https://brevly-ftr.vercel.app/)

## ✨ Features

- **URL Shortening**: Create custom short links with your own slugs
- **Link Management**: View and manage all your created links
- **Click Tracking**: Monitor how many times each link has been clicked
- **CSV Export**: Download your links data as a CSV file
- **Real-time Updates**: Instant feedback with toast notifications
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **API Documentation**: Interactive Swagger UI for developers

## 🏗️ Architecture

This project consists of two main applications:

- **Web Frontend** (`/web`) - React application with TypeScript
- **Server Backend** (`/server`) - Node.js API with Fastify and PostgreSQL

## 🛠️ Tech Stack

### Frontend

- React 19 with TypeScript
- Vite build tool
- Tailwind CSS 4
- TanStack React Query & React Form
- Wouter for routing
- Axios for HTTP requests

### Backend

- Node.js 22 with Fastify
- PostgreSQL 16 with Drizzle ORM
- Zod for validation
- Cloudflare R2 for file storage
- Docker containerization
- Pulumi for Infrastructure as Code

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm package manager
- Docker and Docker Compose
- PostgreSQL 16 (or use Docker)

### 1. Clone and Setup

```bash
git clone <repository-url>
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

- `POST /links` - Create a new short link
- `GET /links` - List all short links
- `DELETE /links/:slug` - Delete a short link
- `GET /links/:slug` - Get original URL by slug
- `POST /links/export` - Export links to CSV

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


## 📁 Project Structure

```sh
├── server/                 # Backend API
│   ├── src/
│   │   ├── app/functions/  # Business logic
│   │   ├── infra/         # Database, HTTP, Storage
│   │   └── shared/        # Utilities
│   ├── docker/            # Docker configuration
│   └── iac/              # Infrastructure as Code
├── web/                   # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── queries/      # API queries
│   │   └── utils/        # Utilities
│   └── public/           # Static assets
└── README.md             # This file
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

Built with ❤️ using modern web technologies