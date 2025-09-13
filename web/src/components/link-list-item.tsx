import type { ILink } from "@/types/links";

type Props = {
  link: ILink;
  baseUrl?: string;                    // ex: "brev.ly/"
  onCopy?: (link: ILink) => void;
  onDelete?: (id: string) => void;
};

export function LinkListItem({ link, baseUrl = "brev.ly/", onCopy, onDelete }: Props) {
  const shortText = `${baseUrl}${link.shortUrl}`;

  return (
    <li className="border-t border-gray-200 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* título + subtítulo */}
        <div className="min-w-0">
          <a
            href={`/${link.shortUrl}`}
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
            {link.clicks} acessos
          </span>

          <button
            type="button"
            onClick={() => (onCopy ? onCopy(link) : navigator.clipboard?.writeText(shortText))}
            className="grid h-10 w-10 place-items-center rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Copiar link encurtado"
            title="Copiar"
          >
            <CopyIcon />
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(link.id)}
            className="grid h-10 w-10 place-items-center rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
            aria-label="Excluir link"
            title="Excluir"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

/* ícones inline (sem dependências) */
function CopyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M9 9h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
