import { BASE_URL } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoIcon from "@/assets/logo-icon.svg"
import { getOriginalLinkBySlug } from "@/services/link";

export function RedirectPage() {
  const [target, setTarget] = useState<string>(BASE_URL)
  const { ["slug"]: shortUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortUrl) {
      // navigate("/404", { replace: true });
      // return;
    }

    (async () => {
      try {
        const res = await getOriginalLinkBySlug(shortUrl ?? "");
        if (!res) throw new Error("not found");

        setTarget(res.originalUrl)

        if (res.originalUrl && /^https?:\/\//i.test(res.originalUrl)) {
          window.location.replace(res.originalUrl);
        } else {
          // navigate("/404", { replace: true });
        }
      } catch {
        // navigate("/404", { replace: true });
      }
    })();
  }, [shortUrl, navigate, target]);

  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="flex flex-col gap-6 items-center bg-gray-100 rounded-md mx-4 text-center lg:py-16 lg:px-12 px-5 py-12">
        <img src={LogoIcon} alt="Brev" className="w-12 h-12" />
        <p className="text-style-xl text-gray-600">Redirecionando...</p>
        <span className="text-style-md text-gray-500">O link será aberto automaticamente em alguns instantes.<br />Não foi redirecionado? <a className="text-style-md text-blue-base" href={target}>Acesse aqui</a></span>
      </div>
    </div>
  );
}
