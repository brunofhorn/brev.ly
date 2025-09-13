import { useLinksContext } from "@/contexts/links-context";
import { useLoadingsContext } from "@/contexts/loadings-context";
import type { LinksListItemProps } from "@/types/links";
import { PiCopy, PiTrashLight } from "react-icons/pi";

export function LinkListItem({ link }: LinksListItemProps) {
  const { handleLoadings } = useLoadingsContext()
  const { removeLink } = useLinksContext()
  const baseUrl = import.meta.env.VITE_BASE_URL ?? "http://brev.ly/"
  const shortText = `${baseUrl}${link.shortUrl}`;

  const handleDeleteLink = async () => {
    handleLoadings({
      key: "deleteLink",
      value: true
    })

    try {
      await removeLink(link.id)
    } catch (error) {
      console.error("[LINKS][DELETE]", error)
    } finally {
      handleLoadings({
        key: "deleteLink",
        value: false
      })
    }
  }

  return (
    <li className="border-t border-gray-200 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <a
            href={shortText}
            className="block truncate font-semibold text-primary hover:underline"
            title={shortText}
          >
            {shortText}
          </a>
          <p className="truncate text-sm text-gray-400" title={link.originalUrl}>
            {link.originalUrl.replace(/^https?:\/\//, "")}
          </p>
        </div>

        {/* métricas + ações */}
        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap text-sm text-gray-500">
            {link.clicks ? link.clicks : '0'} acessos
          </span>

          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(shortText)}
            className="grid h-8 w-8 place-items-center rounded cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Copiar link encurtado"
            title="Copiar"
          >
            <PiCopy size={16} />
          </button>

          <button
            type="button"
            onClick={handleDeleteLink}
            className="grid h-8 w-8 place-items-center rounded cursor-pointer bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Excluir link"
            title="Excluir"
          >
            <PiTrashLight size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
