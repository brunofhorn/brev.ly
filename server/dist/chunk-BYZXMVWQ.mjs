import {
  deleteShortLink
} from "./chunk-AL7RIABG.mjs";
import {
  isRight,
  unwrapEither
} from "./chunk-7HFJ4A6Z.mjs";

// src/routes/delete-short-link.routes.ts
import { z } from "zod/v4";
var deleteShortLinkRoute = async (app) => {
  app.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a short link",
        tags: ["shortlinks"],
        params: z.object({
          id: z.string().min(1)
        }),
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
            errors: z.optional(z.string())
          }),
          500: z.object({
            message: z.string(),
            errors: z.optional(z.string())
          })
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params;
      const result = await deleteShortLink(id);
      if (isRight(result)) {
        return reply.status(204).send();
      }
      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case "ShortLinkNotFoundError":
          return reply.status(404).send({ message: error.message });
        default:
          return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
};

export {
  deleteShortLinkRoute
};
