# Brev.ly Web

A modern URL shortener web application built with React and TypeScript. Create, manage, and track your shortened links with a clean and intuitive interface.

## ✨ Features

- **URL Shortening**: Create custom short links with your own slugs
- **Link Management**: View and manage all your created links
- **Click Tracking**: Monitor how many times each link has been clicked
- **CSV Export**: Download your links data as a CSV file
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback with toast notifications

## 🚀 Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: TanStack React Query for server state
- **Form Handling**: TanStack React Form with Zod validation
- **Routing**: Wouter (lightweight React router)
- **HTTP Client**: Axios
- **Icons**: Phosphor Icons
- **Notifications**: React Toastify

## 📋 Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) or npm

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd web
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env-example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   VITE_API_URL=http://localhost:3333
   VITE_APP_URL=http://localhost:5173
   ```

## 🏃‍♂️ Development

### Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Run linting

```bash
pnpm lint
```

## 📁 Project Structure

```sh
src/
├── assets/          # Static assets (logos, images)
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components (Button, TextInput)
│   └── Links.tsx   # Links list component
├── http/           # HTTP client configuration
├── pages/          # Page components
│   ├── Home.tsx    # Main application page
│   ├── NotFound.tsx # 404 page
│   └── SlugRedirect.tsx # Redirect handler
├── queries/        # TanStack Query hooks
│   ├── client.ts   # Query client configuration
│   └── short-links/ # Short link related queries
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## �� Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:3333` |
| `VITE_APP_URL` | Frontend application URL | `http://localhost:5173` |

### API Integration

The application expects a backend API with the following endpoints:

- `GET /short-links` - List all short links
- `POST /short-links` - Create a new short link
- `DELETE /short-links/:id` - Delete a short link
- `GET /short-links/:slug` - Get short link by slug
- `GET /short-links/export/csv` - Export links as CSV

## 🎨 UI/UX Features

- **Modern Design**: Clean and minimalist interface
- **Responsive Layout**: Optimized for all screen sizes
- **Form Validation**: Real-time validation with Zod schemas
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success and error feedback

## 🧪 Development Guidelines

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

### Best Practices

- Use TypeScript interfaces for type definitions
- Implement proper error boundaries
- Follow React hooks best practices
- Use semantic HTML elements
- Ensure accessibility compliance

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

Built with ❤️ using modern web technologies