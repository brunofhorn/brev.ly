import {
  exportShortLinksToCsv
} from "./chunk-DJ7RMF7C.mjs";
import {
  unwrapEither
} from "./chunk-7HFJ4A6Z.mjs";

// src/routes/export-short-links-to-csv.routes.ts
import { z } from "zod/v4";
var exportShortLinksToCsvRoute = async (app) => {
  app.post(
    "/links/export",
    {
      schema: {
        summary: "Export short links to CSV",
        tags: ["shortlinks"],
        response: {
          200: z.object({
            exportCsvUrl: z.url()
          }),
          400: z.object({
            message: z.string()
          }),
          500: z.object({
            message: z.string()
          })
        }
      }
    },
    async (_, reply) => {
      const result = await exportShortLinksToCsv();
      const { exportCsvUrl } = unwrapEither(result);
      return reply.status(200).send({ exportCsvUrl });
    }
  );
};

export {
  exportShortLinksToCsvRoute
};
