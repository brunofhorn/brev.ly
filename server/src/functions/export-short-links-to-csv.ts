import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { asc } from "drizzle-orm";
import { type Either, makeRight } from "@/shared/either";
import { db, pg } from "@/db/client";
import { links } from "@/db/schema";
import { stringify } from "csv-stringify";
import { env } from "@/lib/env";
import { uploadCsvToFileStorage } from "@/lib/r2";
import { randomUUID } from "node:crypto";
import { formatDateToBR } from "@/lib/format-date-to-br";

export async function exportShortLinksToCsv(): Promise<
  Either<never, { exportCsvUrl: string }>
> {
  const csvFileName = `exports/export_csv_short_links_${randomUUID()}.csv`;

  const csvHeader = stringify({
    delimiter: ",",
    header: true,
    bom: true,
    columns: [
      { key: "id", header: "ID" },
      { key: "original_url", header: "Original URL" },
      { key: "short_url", header: "Short URL" },
      { key: "clicks", header: "Access Count" },
      { key: "created_at", header: "Created at" },
    ],
  });

  const { sql, params } = db
    .select({
      id: links.id,
      originalUrl: links.originalUrl,
      shortUrl: links.shortUrl,
      clicks: links.clicks,
      createdAt: links.createdAt,
    })
    .from(links)
    .orderBy(asc(links.createdAt))
    .toSQL();

  const cursor = pg.unsafe(sql, params as string[]).cursor(50);

  const csvStream = new PassThrough();

  const csvToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(links, _, done) {
        for (const link of links) {
          this.push({
            ...link,
            short_url: `${env.BASE_URL}/${link.short_url}`,
            created_at: formatDateToBR.format(new Date(link.created_at)),
          });
        }
        done();
      },
    }),
    csvHeader,
    csvStream
  );

  const csvUploaded = uploadCsvToFileStorage({
    fileName: csvFileName,
    contentStream: csvStream,
  });

  const [{ url }] = await Promise.all([csvUploaded, csvToCSVPipeline]);

  return makeRight({
    exportCsvUrl: url,
  });
}
