import { IoIosLink } from "react-icons/io";

export function EmptyList() {
    return (
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 pb-6 text-center">
            <div className="mx-auto pt-4 place-items-center text-gray-400">
                <IoIosLink size={30} />
            </div>
            <p className="text-md font-medium uppercase tracking-wide text-gray-500">
                AINDA NÃO EXISTEM LINKS CADASTRADOS
            </p>
        </div>
    )
}