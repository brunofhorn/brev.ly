import { db } from "@/db/client";
import { links } from "@/db/schema";
import { desc, eq, ilike } from "drizzle-orm";
import { normalizeHttpUrl, isHttpPublicUrl } from "@/lib/normalize-url";
import { nanoid } from "nanoid";
import { createCsvStream } from "@/lib/csv";
import { uploadStreamToR2 } from "@/lib/r2";
export async function createLink(params) {
    const shortUrl = params.shortUrl.trim();
    if (!/^[a-z0-9-]+$/i.test(shortUrl)) {
        throw new Error("URL encurtada mal formatada");
    }
    const normalized = normalizeHttpUrl(params.originalUrl);
    if (!isHttpPublicUrl(normalized)) {
        throw new Error("URL original inválida");
    }
    const exists = await db.query.links.findFirst({
        where: eq(links.shortUrl, shortUrl),
    });
    if (exists)
        throw new Error("Já existe um link com esse código");
    const [created] = await db
        .insert(links)
        .values({ shortUrl, originalUrl: normalized })
        .returning();
    return created;
}
export async function deleteByShortUrl(shortUrl) {
    const res = await db.delete(links).where(eq(links.shortUrl, shortUrl)).returning();
    if (!res.length)
        throw new Error("Link não encontrado");
    return res[0];
}
export async function getByShortUrl(shortUrl) {
    const item = await db.query.links.findFirst({ where: eq(links.shortUrl, shortUrl) });
    if (!item)
        throw new Error("Link não encontrado");
    return item;
}
export async function incrementClicks(shortUrl) {
    // evite race? você pode usar UPDATE ... SET clicks = clicks + 1 RETURNING
    const updated = await db
        .update(links)
        .set({ clicks: links.clicks + 1 }) // drizzle permite expr com SQL template, alternativa: sql`${links.clicks} + 1`
        .where(eq(links.shortUrl, shortUrl))
        .returning();
    if (!updated.length)
        throw new Error("Link não encontrado");
    return updated[0];
}
export async function listLinks(opts) {
    const page = Math.max(1, opts.page ?? 1);
    const perPage = Math.min(100, Math.max(1, opts.perPage ?? 20));
    const offset = (page - 1) * perPage;
    const where = opts.q ? ilike(links.shortUrl, `%${opts.q}%`) : undefined;
    const rows = await db
        .select()
        .from(links)
        .where(where)
        .orderBy(desc(links.createdAt))
        .limit(perPage)
        .offset(offset);
    // total opcional (contagem pode ser pesada em bases gigantes; ok para este desafio)
    const totalResult = await db.$count(links, where);
    return { items: rows, page, perPage, total: totalResult };
}
export async function exportCsvToR2(baseShortUrl) {
    // stream CSV por páginas para não estourar memória
    const key = `exports/links-${nanoid(10)}.csv`;
    const { stream, writeRow, end } = createCsvStream();
    // começa upload enquanto escreve (streaming para R2)
    const uploadPromise = uploadStreamToR2(key, stream, "text/csv;charset=utf-8");
    const perPage = 1000;
    let page = 1;
    // paginação simples via offset (ok para desafio). Em produção, prefira cursor em created_at.
    for (;;) {
        const batch = await db
            .select()
            .from(links)
            .orderBy(desc(links.createdAt))
            .limit(perPage)
            .offset((page - 1) * perPage);
        if (!batch.length)
            break;
        for (const r of batch) {
            writeRow({
                original_url: r.originalUrl,
                short_url: new URL(r.shortUrl, baseShortUrl).toString(),
                clicks: r.clicks,
                created_at: r.createdAt.toISOString(),
            });
        }
        page++;
    }
    end();
    const publicUrl = await uploadPromise;
    return { url: publicUrl, key };
}
