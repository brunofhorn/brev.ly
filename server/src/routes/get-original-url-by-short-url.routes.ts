import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { isRight, unwrapEither } from "@/shared/either";
import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import { getOriginalUrlByShortUrl } from "@/functions/get-original-url-by-short-url";

export const getOriginalLinkByShorUrlRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.get(
    "/links/:shortUrl",
    {
      schema: {
        summary: "Get original url by short url code",
        tags: ["shortlinks"],
        params: z.object({
          shortUrl: z.string().regex(DEFAULT_PATTERN_SHORTLINK),
        }),
        response: {
          200: z.object({
            originalUrl: z.url(),
          }),
          404: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params;

      const result = await getOriginalUrlByShortUrl({ shortUrl });

      if (isRight(result)) {
        return reply.status(200).send(unwrapEither(result));
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
