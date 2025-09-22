import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import { z } from "zod";

export const createShortLinkSchema = z.object({
  originalUrl: z.url().max(2048),
  shortUrl: z.string().max(255).regex(DEFAULT_PATTERN_SHORTLINK),
});

export type CreateShortLinkValues = z.infer<typeof createShortLinkSchema>;
