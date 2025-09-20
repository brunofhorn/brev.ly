import {
  getOriginalLinkByShorUrlRoute
} from "./chunk-DN7ZI4F4.mjs";
import {
  listShortLinksRoute
} from "./chunk-M3BBE3KC.mjs";
import {
  createShortLinkRoute
} from "./chunk-2SMSKS7R.mjs";
import {
  deleteShortLinkRoute
} from "./chunk-BYZXMVWQ.mjs";
import {
  exportShortLinksToCsvRoute
} from "./chunk-7HGV7Z7X.mjs";
import {
  transformSwaggerSchema
} from "./chunk-JXU3I7BM.mjs";

// src/server.ts
import Fastify from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastifySwagger } from "@fastify/swagger";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler
} from "fastify-type-provider-zod";
import fastifySwaggerUi from "@fastify/swagger-ui";
function buildServer() {
  const app = Fastify({ logger: true }).withTypeProvider();
  app.setSerializerCompiler(serializerCompiler);
  app.setValidatorCompiler(validatorCompiler);
  app.setErrorHandler((error, _request, reply) => {
    if (hasZodFastifySchemaValidationErrors(error)) {
      return reply.code(400).send({
        message: "Validation error.",
        errors: Array.isArray(error.validation) ? error.validation[0]?.message : error.validation
      });
    }
    return reply.code(500).send({
      message: "Internal server error."
    });
  });
  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  });
  app.register(fastifyMultipart);
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Brev.ly API",
        version: "1.0.0"
      }
    },
    transform: transformSwaggerSchema
  });
  app.register(listShortLinksRoute);
  app.register(createShortLinkRoute);
  app.register(deleteShortLinkRoute);
  app.register(getOriginalLinkByShorUrlRoute);
  app.register(exportShortLinksToCsvRoute);
  app.register(fastifySwaggerUi, {
    routePrefix: "/docs"
  });
  app.get("/health", async () => ({ ok: true }));
  return app;
}

export {
  buildServer
};
