import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import { isRight, unwrapEither } from "@/shared/either";
import { createShortLink } from "@/functions";

export const createShortLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/links",
    {
      schema: {
        summary: "Create a short link from original url.",
        tags: ["shortlinks"],
        body: z.object({
          originalUrl: z.url(),
          shortUrl: z.string().min(1).max(255).regex(DEFAULT_PATTERN_SHORTLINK),
        }),
        response: {
          201: z.object({
            id: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            clicks: z.number(),
            createdAt: z.date()
          }),
          400: z.object({
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
    async (req, reply) => {
      const { originalUrl, shortUrl } = req.body;
      const created = await createShortLink({ originalUrl, shortUrl });

      if (isRight(created)) {
        return reply.status(201).send(unwrapEither(created));
      }

      const error = unwrapEither(created);

      switch (error.constructor.name) {
        case "DuplicateShortLinkError":
          return reply
            .status(400)
            .send({ message: "Short link already exists." });
        case "PoorlyFormattedShortUrlError":
          return reply
            .status(400)
            .send({ message: "Short URL poorly formatted." });
        case "InvalidOriginalUrlError":
          return reply.status(400).send({ message: "Invalid original URL." });
        default:
          return reply.status(500).send({ message: "Internal server error." });
      }
    }
  );
};
