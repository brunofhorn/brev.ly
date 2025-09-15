import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { RedirectPage } from "../pages/RedirectPage";
import LinksContextProvider from "@/contexts/providers/links-context-provider";
import LoadingsContextProvider from "@/contexts/providers/loadings-context-provider";

export function AppRoutes() {
  return (
    <LoadingsContextProvider>
      <LinksContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<RedirectPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LinksContextProvider>
    </LoadingsContextProvider>
  );
}
