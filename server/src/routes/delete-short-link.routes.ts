import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { isRight, unwrapEither } from "@/shared/either";
import { deleteShortLink } from "@/functions/delete-short-link";

export const deleteShortLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a short link",
        tags: ["shortlinks"],
        params: z.object({
          id: z.string().min(1),
        }),
        response: {
          204: z.null(),
          404: z.object({
            message: z.string(),
            errors: z.optional(z.string()),
          }),
          500: z.object({
            message: z.string(),
            errors: z.optional(z.string()),
          }),
        },
      },
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
