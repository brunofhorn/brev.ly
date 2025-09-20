import {
  formatDateToBR
} from "./chunk-AY2LMT5P.mjs";
import {
  uploadCsvToFileStorage
} from "./chunk-XTCJNSOV.mjs";
import {
  makeRight
} from "./chunk-7HFJ4A6Z.mjs";
import {
  db,
  pg
} from "./chunk-HA36QCVT.mjs";
import {
  env
} from "./chunk-MMVDJLD3.mjs";
import {
  links
} from "./chunk-K4F4GMEW.mjs";

// src/functions/export-short-links-to-csv.ts
import { PassThrough, Transform } from "stream";
import { pipeline } from "stream/promises";
import { asc } from "drizzle-orm";
import { stringify } from "csv-stringify";
import { randomUUID } from "crypto";
async function exportShortLinksToCsv() {
  const csvFileName = `exports/export_csv_short_links_${randomUUID()}.csv`;
  const csvHeader = stringify({
    delimiter: ",",
    header: true,
    bom: true,
    columns: [
      { key: "original_url", header: "URL Original" },
      { key: "short_url", header: "URL Encurtada" },
      { key: "clicks", header: "Clicks" },
      { key: "created_at", header: "Data de Cria\xE7\xE3o" }
    ]
  });
  const { sql, params } = db.select({
    originalUrl: links.originalUrl,
    shortUrl: links.shortUrl,
    clicks: links.clicks,
    createdAt: links.createdAt
  }).from(links).orderBy(asc(links.createdAt)).toSQL();
  const cursor = pg.unsafe(sql, params).cursor(50);
  const csvStream = new PassThrough();
  const csvToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(links2, _, done) {
        for (const link of links2) {
          this.push({
            ...link,
            short_url: `${env.BASE_URL}/${link.short_url}`,
            created_at: formatDateToBR.format(new Date(link.created_at))
          });
        }
        done();
      }
    }),
    csvHeader,
    csvStream
  );
  const csvUploaded = uploadCsvToFileStorage({
    fileName: csvFileName,
    contentStream: csvStream
  });
  const [{ url }] = await Promise.all([csvUploaded, csvToCSVPipeline]);
  return makeRight({
    exportCsvUrl: url
  });
}

export {
  exportShortLinksToCsv
};
