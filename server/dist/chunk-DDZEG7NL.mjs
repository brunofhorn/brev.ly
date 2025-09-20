import {
  DEFAULT_PATTERN_SHORTLINK
} from "./chunk-BQQ7CXZ7.mjs";

// src/schemas/create-link.schema.ts
import z from "zod";
var createShortLinkSchema = z.object({
  originalUrl: z.url().max(2048),
  shortUrl: z.string().max(255).regex(DEFAULT_PATTERN_SHORTLINK)
});

export {
  createShortLinkSchema
};
