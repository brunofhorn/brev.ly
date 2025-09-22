import { isHttpPublicUrl, normalizeHttpUrl } from "@/helpers/normalizeHttpUrl";
import { z } from "zod";

export const linksCreateFormSchema = z.object({
  originalUrl: z
    .string()
    .min(1, "Informe a URL.")
    .trim()
    .transform(normalizeHttpUrl)
    .refine(isHttpPublicUrl, "Informe uma URL válida."),
  shortUrl: z
    .string()
    .min(1, "Informe a url encurtada.")
    .trim()
    .regex(
      /^(?!-)(?!.*--)(?!.*-$)[a-z0-9-]+$/,
      "Informe uma URL minúscula e sem espaço / caracter especial."
    ),
});

export type LinksFormCreateValues = z.infer<typeof linksCreateFormSchema>;
