
import Error404 from "@/assets/404.svg"

export function NotFound() {
    return (
        <div className="h-dvh flex justify-center items-center">
            <div className="flex flex-col gap-6 items-center bg-gray-100 rounded-md mx-4 text-center lg:py-16 lg:px-12 px-5 py-12">
                <img src={Error404} alt="O número 404 indicando erro de rota não encontrada." className="w-48 h-20" />
                <p className="text-style-xl text-gray-600">Link não encontrado</p>
                <span className="text-style-md text-gray-500">
                    O link que você está tentando acessar não existe, foi removido ou é
                    <br />uma URL inválida. Saiba mais em <a className="text-style-md text-blue-base" href={"https://brev.ly"}>brev.ly</a>
                </span>
            </div>
        </div>
    );
}
