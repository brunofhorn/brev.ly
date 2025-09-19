import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import { AppRoutes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{ duration: 4000 }}
      />
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
