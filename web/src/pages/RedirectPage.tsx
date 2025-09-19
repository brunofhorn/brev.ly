import { BASE_URL } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoIcon from "@/assets/logo-icon.svg"
import { getOriginalUrlByShortUrl } from "@/services/link";

export function RedirectPage() {
  const [target, setTarget] = useState<string>(BASE_URL)
  const { ["slug"]: shortUrl } = useParams();
  const navigate = useNavigate();
  const ranRef = useRef(false);

  useEffect(() => {
    if (!shortUrl) {
      navigate("/404", { replace: true });
      return;
    }

    if (ranRef.current) return;
    ranRef.current = true;

    (async () => {
      try {
        const link = await getOriginalUrlByShortUrl(shortUrl);
        const url = link?.originalUrl;

        if (!url || !/^https?:\/\//i.test(url)) {
          navigate("/404", { replace: true });
          return;
        }

        setTarget(url);

        window.location.replace(url);
      } catch {
        navigate("/404", { replace: true });
      }
    })();
  }, [navigate, shortUrl]);

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
