import { Routes, Route } from "react-router-dom";
import { Home } from "../pages";
import { NotFound } from "../pages/NotFound";
import { RedirectPage } from "../pages/RedirectPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="/:url-encurtada" element={<RedirectPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
