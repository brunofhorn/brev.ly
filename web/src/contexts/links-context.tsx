import { createContext, useContext } from "react";
import type { ILink } from "@/types/links";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";

export type LinksContextProps = {
    page: number;
    perPage: number;
    total: number;
    links: ILink[] | [];
    fetchAllLinks: (page?: number, perPage?: number) => Promise<void>;
    createLink: (params: LinksFormCreateValues) => Promise<ILink>
    removeLink: (id: string) => Promise<void>
    getOriginalURL: (shortUrl: string) => Promise<{originalUrl: string}>
};

export const LinksContext = createContext<LinksContextProps>({} as LinksContextProps);

export function useLinksContext() {
    const context = useContext(LinksContext);

    if (!context) {
        throw new Error("useLinksContext must be used within <LinksContextProvider>");
    }

    return context;
}
