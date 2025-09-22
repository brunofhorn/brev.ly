import { PiWarning } from "react-icons/pi";

export function InputError({ message }: { message: string }) {
    return (
        <p className="mt-1 text-sm text-danger flex flex-row gap-2 items-center">
            <PiWarning size={15} />
            {message}
        </p>
    )
}