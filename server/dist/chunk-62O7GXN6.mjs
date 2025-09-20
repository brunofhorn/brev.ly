// src/schemas/export-csv.schema.ts
import { Readable } from "stream";
import z from "zod";
var exportCsvToFileStorageSchema = z.object({
  fileName: z.string(),
  contentStream: z.instanceof(Readable)
});

export {
  exportCsvToFileStorageSchema
};
