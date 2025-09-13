import { createContext, useContext } from "react";
import type { ILink } from "@/types/links";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";

export type LinksContextProps = {
    links: ILink[] | [];
    fetchAllLinks: () => Promise<void>;
    createLink: (params: LinksFormCreateValues) => Promise<void>
    removeLink: (id: string) => Promise<void>
};

export const LinksContext = createContext<LinksContextProps>({} as LinksContextProps);

export function useLinksContext() {
    const context = useContext(LinksContext);

    if (!context) {
        throw new Error("useLinksContext must be used within <LinksContextProvider>");
    }

    return context;
}
