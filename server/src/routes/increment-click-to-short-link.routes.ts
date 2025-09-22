import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { isRight, unwrapEither } from "@/shared/either";
import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import { incrementClickCountByShortUrl } from "@/functions";

export const incrementClickToShortLinkRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.put(
    "/links/:shortUrl/hit",
    {
      schema: {
        summary: "Increment click on short link.",
        tags: ["shortlinks"],
        params: z.object({
          shortUrl: z.string().regex(DEFAULT_PATTERN_SHORTLINK),
        }),
        response: {
          200: z.object({
            clicks: z.number(),
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

      const result = await incrementClickCountByShortUrl({ shortUrl });

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
