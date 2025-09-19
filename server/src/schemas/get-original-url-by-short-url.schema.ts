import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import z from "zod";

export const  getOriginalUrlByShortUrlSchema = z.object({
  shortUrl: z.string().regex(DEFAULT_PATTERN_SHORTLINK),
});

export type GetOriginalUrlByShortUrlValues = z.infer<typeof getOriginalUrlByShortUrlSchema>;