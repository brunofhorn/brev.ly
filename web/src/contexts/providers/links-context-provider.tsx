import { useCallback, useRef, useState } from "react";
import type { ILink } from "@/types/links";
import { LinksContext, type LinksContextProps } from "@/contexts/links-context";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import { createShortLink, deleteShortLink, getShortLinks } from "@/services/link";

type LinksContextProviderProps = { children: React.ReactNode };

export default function LinksContextProvider({ children }: LinksContextProviderProps) {
    const [links, setLinks] = useState<ILink[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [total, setTotal] = useState(0);
    const backupRef = useRef<ILink[] | null>(null);

    const fetchAllLinks = useCallback(async (p = page, pp = perPage) => {
        const res = await getShortLinks({ page: p, perPage: pp });

        setLinks(res.items);
        setPage(res.page);
        setPerPage(res.perPage);
        setTotal(res.total);
    }, []);


    const createLink = useCallback(async (newLink: LinksFormCreateValues) => {
        const tempId = `tmp_${Math.random().toString(36).slice(2)}`;
        const optimistic: ILink = {
            id: tempId,
            originalUrl: newLink.originalUrl,
            shortUrl: newLink.shortUrl,
            clicks: 0,
            createdAt: new Date().toISOString(),
        };

        setLinks(prev => (prev ? [optimistic, ...prev] : [optimistic]));

        try {
            const saved = await createShortLink(newLink);
            setLinks(prev => prev?.map(l => (l.id === tempId ? saved : l)) ?? [saved]);
            return saved;
        } catch (e) {
            setLinks(prev => prev?.filter(l => l.id !== tempId) ?? []);
            throw e;
        }
    }, [setLinks]);

    const removeLink = useCallback(async (id: string) => {
        setLinks(prev => {
            backupRef.current = prev ?? [];
            return (prev ?? []).filter(l => l.id !== id);
        });

        try {
            await deleteShortLink(id);
        } catch (e) {
            setLinks(backupRef.current ?? []);
            throw e;
        }
    }, []);

    const value: LinksContextProps = { links, fetchAllLinks, createLink, removeLink, page, perPage, total };
    return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}
