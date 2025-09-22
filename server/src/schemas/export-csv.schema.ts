import { Readable } from "node:stream";
import { z } from "zod";

export const exportCsvToFileStorageSchema = z.object({
  fileName: z.string(),
  contentStream: z.instanceof(Readable),
});

export type ExportCsvToFileStorageValues = z.input<
  typeof exportCsvToFileStorageSchema
>;
