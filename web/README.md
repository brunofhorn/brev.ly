<div style="text-align:center">
  <a href="https://brevly-ftr.vercel.app/">
    <img src="../assets/logo.svg" alt="Brev.ly - Encurtador de Links" width="300">
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

<a id="features"></a>
## ✨ Features and Rules
Just like the API, we have the following features and rules:

📌 Link Creation
- [x] Create a new shortened link
- [x] Validate the format of the shortened URL
- [x] Prevent duplicate shortened URLs

❌ Link Deletion
- [x] Delete an existing link

🔍 Query and Access
- [x] Get the original URL from a shortened URL
- [x] List all registered URLs
- [x] Automatically increment the access count when visiting a link

📤 CSV Export
- [x] Download a report of the created links in a CSV file

🛠️ Specific Rules for the Frontend
- [x] React application in SPA format using Vite as a bundler
- [x] Interface faithfully following the layout available in Figma

💎 Improved user experience:
- [x] Friendly empty states
- [x] Loading icons / Skeletons
- [x] Blocking actions during asynchronous operations
- [x] Full responsiveness for desktops and mobile devices

<a id="architecture"></a>
## 🏗️ Architecture

React + Vite application, using Typescript and hosted on Vercel.

<a id="tech-stack"></a>
## 🛠️ Tech Stack

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

### 2. Frontend Setup

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

<a id="structure"></a>
## 📁 Project Structure

```sh
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
└────── README.md           # This file
```

## 🔧 Environment Variables

### Frontend (.env)

```env
VITE_BASE_URL="http://localhost:5173
VITE_API_BASE="http://localhost:3333
```

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

- **[Server Backend Documentation](../server/README.md)** - Complete guide for the Node.js backend

---

Built with ❤️ using modern web technologies.