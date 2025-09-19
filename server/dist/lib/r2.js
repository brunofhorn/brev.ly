import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
export const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
    },
});
export async function uploadStreamToR2(key, body, contentType) {
    const cmd = new PutObjectCommand({
        Bucket: env.CLOUDFLARE_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
    });
    await r2.send(cmd);
    // URL pública (ex.: https://cdn.seu-dominio.com/<key>)
    return new URL(key, env.CLOUDFLARE_PUBLIC_URL).toString();
}
