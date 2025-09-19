import Button from "@/components/button";
import { LinkListItem } from "./LinkListItem";
import { useLinksContext } from "@/contexts/links-context";
import { useCallback, useEffect } from "react";
import { useLoadingsContext } from "@/contexts/loadings-context";
import { EmptyList } from "./EmptyList";
import { TbDownload } from "react-icons/tb";
import { LinksSkeleton } from "@/components/links-skeleton";
import { Pagination } from "@/components/pagination";
import { exportShortLinksCsv } from "@/services/link";
import { toast } from "sonner";

export function LinkList() {
  const { handleLoadings, loadings } = useLoadingsContext()
  const { links, page, perPage, total, fetchAllLinks } = useLinksContext();
  const isEmpty = links?.length === 0;

  const handleExport = async () => {
    try {
      const { exportUrl } = await exportShortLinksCsv();

      toast.success("Sucesso!", { description: "Links exportados com sucesso. Fazendo download do arquivo." });

      window.location.href = exportUrl
    } catch (error) {
      console.error("[LINKS][EXPORT_CSV]", error)
      toast.error("Error!", { description: "Erro ao exportar os links." });
    }
  };


  const handleFetchLinks = useCallback(async (page: number) => {
    try {
      handleLoadings({ key: "fetchLinks", value: true });
      await fetchAllLinks(page, perPage);
    } catch (error) {
      console.error("[LINKS][FETCH]", error);
    } finally {
      handleLoadings({ key: "fetchLinks", value: false });
    }
  }, [fetchAllLinks, handleLoadings, perPage])

  useEffect(() => {
    (async () => {
      await Promise.all([
        handleFetchLinks(1)
      ])
    })()
  }, [handleFetchLinks])

  return (
    <section className="w-full lg:w-8/12 rounded-md bg-gray-100 p-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-style-lg text-gray-600">Meus links</h2>

        <Button
          variant="secondary"
          size="md"
          onClick={handleExport}
          disabled={isEmpty}
          leftIcon={<TbDownload size={20} />}
        >
          Baixar CSV
        </Button>
      </div>

      {loadings.fetchLinks ? (
        <LinksSkeleton />
      ) : (
        <>
          {links.length === 0 ? (
            <EmptyList />
          ) : (
            <>
              <ul className="divide-y-0">
                {links?.map((link, idx) => (
                  <LinkListItem
                    key={link.id ?? idx}
                    link={link}
                  />
                ))}
              </ul>

              <Pagination
                page={page}
                perPage={perPage}
                total={total}
                onPageChange={(p) => handleFetchLinks(p)}
              />
            </>
          )}
        </>
      )}
    </section>
  );
}