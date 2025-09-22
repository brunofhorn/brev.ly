import { Popconfirm } from "@/components/pop-confirm";
import { useLinksContext } from "@/contexts/links-context";
import { useLoadingsContext } from "@/contexts/loadings-context";
import { BASE_URL } from "@/lib/constants";
import type { LinksListItemProps } from "@/types/links";
import { PiCopy, PiTrashLight } from "react-icons/pi";
import { toast } from "sonner";

export function LinkListItem({ link }: LinksListItemProps) {
  const { handleLoadings } = useLoadingsContext()
  const { removeLink } = useLinksContext()
  const shortText = `${BASE_URL}/${link.shortUrl}`;

  const handleDeleteLink = async () => {
    handleLoadings({
      key: "deleteLink",
      value: true
    })

    try {
      await removeLink(link.shortUrl)

      toast.success("Sucesso!", {
        description: "O link foi excluído com sucesso."
      })
    } catch (error) {
      console.error("[LINKS][DELETE]", error)

      toast.success("Error!", {
        description: "Ocorreu um erro ao remover o link."
      })
    } finally {
      handleLoadings({
        key: "deleteLink",
        value: false
      })
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard?.writeText(shortText)
    toast.info("Sucesso!", {
      description: `O link ${link.shortUrl} foi copiado para a área de transferência.`
    })
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
            {link.originalUrl}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap text-sm text-gray-500">
            {link.clicks ? link.clicks : '0'} acessos
          </span>

          <button
            type="button"
            onClick={() => copyToClipboard()}
            className="grid cursor-pointer h-8 w-8 place-items-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Copiar link encurtado"
            title="Copiar"
          >
            <PiCopy size={16} />
          </button>

          <Popconfirm
            title="Excluir link?"
            description={`Você tem certeza que quer apagar o link ${link.shortUrl}? Essa ação não pode ser desfeita.`}
            onConfirm={handleDeleteLink}
          >
            <button
              type="button"
              className="grid cursor-pointer h-8 w-8 place-items-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
              aria-label="Excluir link"
              title="Excluir"
            >
              <PiTrashLight size={16} />
            </button>
          </Popconfirm>
        </div>
      </div>
    </li>
  );
}
