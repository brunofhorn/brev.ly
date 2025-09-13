import { isHttpPublicUrl, normalizeHttpUrl } from "@/helpers/normalizeHttpUrl";
import z from "zod";

export const linksCreateFormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Informe a URL.")
    .transform(normalizeHttpUrl)
    .refine(isHttpPublicUrl, "URL inválida. Comece com http:// ou https://."),
  shortUrl: z
    .string()
    .min(1, "Informe a url encurtada.")
    .regex(/^[a-z0-9-]+$/i, "Use letras, números e hífen."),
});

export type LinksFormCreateValues = z.infer<typeof linksCreateFormSchema>;
