import { PassThrough } from "node:stream";
export function csvHeader() {
    return "original_url,short_url,clicks,created_at\n";
}
export function csvLine(row) {
    const esc = (s) => {
        const v = String(s ?? "");
        return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
        // csv safe
    };
    return `${esc(row.original_url)},${esc(row.short_url)},${row.clicks},${esc(row.created_at)}\n`;
}
/** cria um stream e expõe writer para ir “paginando” do banco */
export function createCsvStream() {
    const out = new PassThrough();
    out.write(csvHeader());
    return {
        stream: out,
        writeRow: (r) => out.write(csvLine(r)),
        end: () => out.end(),
    };
}
