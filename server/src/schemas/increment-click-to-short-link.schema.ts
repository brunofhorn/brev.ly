import { DEFAULT_PATTERN_SHORTLINK } from "@/shared/constants";
import { z } from "zod";

export const incrementClickToShortLinkSchema = z.object({
  shortUrl: z.string().regex(DEFAULT_PATTERN_SHORTLINK),
});

export type IncrementClickToShortLinkValues = z.infer<typeof incrementClickToShortLinkSchema>;