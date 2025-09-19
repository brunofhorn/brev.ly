import { listShortLinks } from "@/functions/list-short-links";
import { unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const listShortLinksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    "/links",
    {
      schema: {
        summary: "List all links and short links",
        tags: ["shortlinks"],
        querystring: z.object({
          page: z.optional(z.coerce.number().min(1).default(1)),
          perPage: z.optional(z.coerce.number().min(5).max(100).default(5)),
        }),
        response: {
          200: z.object({
            items: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.url(),
                shortUrl: z.string(),
                clicks: z.number(),
                createdAt: z.date(),
              })
            ),
            page: z.number(),
            perPage: z.number(),
            total: z.number(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const result = await listShortLinks(req.query);

      const links = unwrapEither(result);

      return reply.status(200).send(links);
    }
  );
};
