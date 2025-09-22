import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isRight, unwrapEither } from "@/shared/either";
import { deleteShortLink } from "@/functions/delete-short-link";

export const deleteShortLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.delete(
    "/links/:shortUrl",
    {
      schema: {
        summary: "Delete a short link by short url.",
        tags: ["shortlinks"],
        params: z.object({
          shortUrl: z.string().min(1),
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
      const { shortUrl } = request.params;

      const result = await deleteShortLink(shortUrl);

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
