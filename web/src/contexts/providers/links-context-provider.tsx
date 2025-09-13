import { useCallback, useState } from "react";
import type { ILink } from "@/types/links";
import { LinksContext, type LinksContextProps } from "@/contexts/links-context";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import { deleteLink } from "@/services/link";

type LinksContextProviderProps = { children: React.ReactNode };

export default function LinksContextProvider({ children }: LinksContextProviderProps) {
    const [links, setLinks] = useState<ILink[]>([]);

    const fetchAllLinks = useCallback(async () => {
        const data: ILink[] = [];
        setLinks(data);
    }, []);

    const createLink = async (newLink: LinksFormCreateValues) => {
        const addLink: ILink = {
            id: '123344',
            ...newLink
        }

        setLinks((prev)=> [...prev, addLink])
        // await postLink(newLink)
        // await fetchAllLinks()
    }

    const removeLink = async (id: string) => {
        await deleteLink(id)
    }

    const value: LinksContextProps = { links, fetchAllLinks, createLink, removeLink };
    return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}
