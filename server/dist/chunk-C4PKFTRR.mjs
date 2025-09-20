import {
  DEFAULT_PATTERN_SHORTLINK
} from "./chunk-BQQ7CXZ7.mjs";

// src/schemas/get-original-url-by-short-url.schema.ts
import z from "zod";
var getOriginalUrlByShortUrlSchema = z.object({
  shortUrl: z.string().regex(DEFAULT_PATTERN_SHORTLINK)
});

export {
  getOriginalUrlByShortUrlSchema
};
