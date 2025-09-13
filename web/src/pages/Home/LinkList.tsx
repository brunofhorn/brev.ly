import Button from "@/components/button";
import { LinkListItem } from "./LinkListItem";
import { useLinksContext } from "@/contexts/links-context";
import { useCallback, useEffect } from "react";
import { useLoadingsContext } from "@/contexts/loadings-context";
import { toCsv } from "@/helpers/toCsv";
import { downloadCsv } from "@/helpers/downloadCsv";
import { EmptyList } from "./EmptyList";
import { TbDownload } from "react-icons/tb";

export function LinkList() {
  const { handleLoadings, loadings } = useLoadingsContext()
  const { links, fetchAllLinks } = useLinksContext()
  const isEmpty = links?.length === 0;

  const baseUrl = import.meta.env.BASE_URL

  const handleExport = () => {
    if (!links.length) return;
    const csv = toCsv(links, baseUrl);
    downloadCsv(csv, "links.csv");
  };


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

      {loadings.fetchLinks || loadings.registerLink ? (
        <span>LOADING</span>
      ) : isEmpty ? (
        <EmptyList />
      ) : (
        <ul className="divide-y-0">
          {links?.map((link, idx) => (
            <LinkListItem
              key={link.id ?? idx}
              link={link}
            />
          ))}
        </ul>
      )}
    </section>
  );
}