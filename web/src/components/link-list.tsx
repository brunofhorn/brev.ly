import Button from "@/components/button";
import { LinkListItem } from "./link-list-item";
import { useLinksContext } from "@/contexts/links-context";
import { useCallback, useEffect } from "react";
import { useLoadingsContext } from "@/contexts/loadings-context";
import type { ILink } from "@/types/links";

/* helpers para CSV */
function escapeCsvCell(v: string) {
  const s = String(v ?? "");
  if (/[,"\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
function toCsv(rows: ILink[], baseUrl: string) {
  const header = ["id", "shortUrl", "target", "clicks"].join(",");
  const body = rows
    .map((r) =>
      [
        escapeCsvCell(r.id),
        escapeCsvCell(`${baseUrl}${r.shortUrl}`),
        escapeCsvCell(r.originalUrl),
        r.clicks,
      ].join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}
function download(text: string, filename: string, mime = "text/csv;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function LinkList() {
  const { handleLoadings, loadings } = useLoadingsContext()
  const { links, fetchAllLinks } = useLinksContext()

  const baseUrl = "brev.ly/"

  const handleExport = () => {
    if (!links.length) return;
    const csv = toCsv(links, baseUrl);
    download(csv, "links.csv");
  };

  const isEmpty = links?.length === 0;

  const handleFetchLinks = useCallback(async () => {
    try {
      handleLoadings({
        key: "fetchLinks",
        value: true
      })

      await fetchAllLinks()
    } catch (error) {
      console.error("[LINKS][FETCH]", error)
    } finally {
      handleLoadings({
        key: "fetchLinks",
        value: false
      })
    }
  }, [fetchAllLinks, handleLoadings])

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchLinks()
      ])
    })()
  }, [handleFetchLinks])

  return (
    <section className="rounded-md bg-gray-100 p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-style-lg text-gray-600">Meus links</h2>

        <Button
          variant="secondary"
          size="md"
          onClick={handleExport}
          disabled={isEmpty}
          leftIcon={<DownloadIcon />}
        >
          Baixar CSV
        </Button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 pb-6 text-center">
          <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full text-gray-400">
            <LinkIcon />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            AINDA NÃO EXISTEM LINKS CADASTRADOS
          </p>
        </div>
      ) : (
        <>
          {loadings.fetchLinks || loadings.registerLink ? (
            <span>LOADING</span>
          ) : (
            <ul className="divide-y-0">
              {links?.map((link, idx) => (
                <LinkListItem
                  key={link.id ?? idx}
                  link={link}
                  baseUrl={baseUrl}
                // onCopy={onCopy}
                // onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

/* ícones inline para o botão/empty */
function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M10 14a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14 10a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
