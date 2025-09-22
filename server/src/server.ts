import Fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { createShortLinkRoute } from "./routes/create-short-link.routes";
import { listShortLinksRoute } from "./routes/list-short-links.routes";
import { deleteShortLinkRoute } from "./routes/delete-short-link.routes";
import { getOriginalLinkByShorUrlRoute } from "./routes/get-original-url-by-short-url.routes";
import { exportShortLinksToCsvRoute } from "./routes/export-short-links-to-csv.routes";
import { incrementClickToShortLinkRoute } from "./routes/increment-click-to-short-link.routes";

export function buildServer() {
  const app = Fastify({ logger: true }).withTypeProvider();

  app.setSerializerCompiler(serializerCompiler);
  app.setValidatorCompiler(validatorCompiler);

  app.setErrorHandler((error, _request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        message: "Validation error.",
        errors: Array.isArray(error.validation)
          ? error.validation[0]?.message
          : error.validation,
      });
    }

    return reply.code(500).send({
      message: "Internal server error.",
    });
  });

  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  });

  app.register(fastifyMultipart);
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Brev.ly API",
        version: "1.0.0",
      },
    },
    transform: transformSwaggerSchema,
  });

  app.register(listShortLinksRoute);
  app.register(createShortLinkRoute);
  app.register(deleteShortLinkRoute);
  app.register(getOriginalLinkByShorUrlRoute);
  app.register(incrementClickToShortLinkRoute);
  app.register(exportShortLinksToCsvRoute);

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
  });

  app.get("/health", async () => ({ ok: true }));

  return app;
}
