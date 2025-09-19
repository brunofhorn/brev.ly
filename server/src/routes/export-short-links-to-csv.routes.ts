import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";
import { unwrapEither } from "@/shared/either";
import { exportShortLinksToCsv } from "@/functions/export-short-links-to-csv";

export const exportShortLinksToCsvRoute: FastifyPluginAsyncZod = async (
  app
) => {
  app.post(
    "/links/export",
    {
      schema: {
        summary: "Export short links to CSV",
        tags: ["shortlinks"],
        response: {
          200: z.object({
            exportCsvUrl: z.url(),
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
    async (_, reply) => {
      const result = await exportShortLinksToCsv();

      const { exportCsvUrl } = unwrapEither(result);

      return reply.status(200).send({ exportCsvUrl });
    }
  );
};
