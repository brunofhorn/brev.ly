import {
  exportCsvToFileStorageSchema
} from "./chunk-62O7GXN6.mjs";
import {
  env
} from "./chunk-MMVDJLD3.mjs";

// src/lib/r2.ts
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
var r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY
  }
});
async function uploadCsvToFileStorage(data) {
  const { fileName, contentStream } = exportCsvToFileStorageSchema.parse(data);
  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLOUDFLARE_BUCKET,
      Key: fileName,
      Body: contentStream,
      ContentType: "text/csv; charset=utf-8"
    }
  });
  await upload.done();
  return {
    key: fileName,
    url: publicR2Url(fileName)
  };
}
function publicR2Url(key) {
  const base = env.CLOUDFLARE_PUBLIC_URL;
  const normalizedBase = base.endsWith("/") ? base : base + "/";
  const normalizedKey = key.replace(/^\/+/, "");
  return new URL(normalizedKey, normalizedBase).toString();
}

export {
  r2,
  uploadCsvToFileStorage
};
