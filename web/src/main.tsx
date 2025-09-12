import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home } from './pages/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)
