import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * Ajuste esta função para o seu endpoint real.
 * Ex.: GET {VITE_API_BASE}/links/:code  → { url: "https://alvo.com" }
 */
const API_BASE = import.meta.env.VITE_API_BASE ?? ""; // ex: http://localhost:3333/api
const buildResolveUrl = (code: string) => `${API_BASE}/links/${encodeURIComponent(code)}`;

type ResolveResponse = {
  url?: string;        // comum
  longUrl?: string;    // alternativa
  target?: string;     // alternativa
};

export function RedirectPage() {
  const { ["url-encurtada"]: code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      navigate("/404", { replace: true });
      return;
    }

    (async () => {
      try {
        const res = await fetch(buildResolveUrl(code), { method: "GET" });
        if (!res.ok) throw new Error("not found");

        const data = (await res.json()) as ResolveResponse;
        const target = data?.url ?? data?.longUrl ?? data?.target;

        if (target && /^https?:\/\//i.test(target)) {
          // redireciona para o destino final
          window.location.replace(target);
        } else {
          navigate("/404", { replace: true });
        }
      } catch {
        navigate("/404", { replace: true });
      }
    })();
  }, [code, navigate]);

  return (
    <div className="min-h-dvh grid place-items-center p-6 text-center">
      <div>
        <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-base" />
        <p className="text-sm text-gray-400">Redirecionando…</p>
      </div>
    </div>
  );
}
