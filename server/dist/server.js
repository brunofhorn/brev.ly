import Fastify from "fastify";
import cors from "@fastify/cors";
import { linksRoutes } from "@/routes/links.routes";
export function buildServer() {
    const app = Fastify({ logger: true }).withTypeProvider();
    app.register(cors, { origin: true });
    app.register(linksRoutes);
    app.get("/health", async () => ({ ok: true }));
    return app;
}
