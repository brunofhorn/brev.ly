import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <main className="min-h-dvh grid place-items-center p-6 text-center">
            <div className="max-w-md">
                <h1 className="text-style-xl">Recurso não encontrado</h1>
                <p className="mt-2 text-gray-400">
                    A URL acessada não existe ou o código encurtado é inválido.
                </p>
                <Link
                    to="/"
                    className="btn-primary mt-6 inline-flex"
                >
                    Voltar para a página inicial
                </Link>
            </div>
        </main>
    );
}
