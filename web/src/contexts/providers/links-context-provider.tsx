import { useCallback, useRef, useState } from "react";
import type { ILink } from "@/types/links";
import { LinksContext, type LinksContextProps } from "@/contexts/links-context";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import { createShortLink, deleteShortLink, getOriginalUrlByShortUrl, getShortLinks, incrementClickToShortLink } from "@/services/link";

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

    const removeLink = useCallback(async (shortUrl: string) => {
        setLinks(prev => {
            backupRef.current = prev ?? [];
            return (prev ?? []).filter(l => l.shortUrl !== shortUrl);
        });

        try {
            await deleteShortLink(shortUrl);
        } catch (e) {
            setLinks(backupRef.current ?? []);
            throw e;
        }
    }, []);

    const getOriginalURL = useCallback(async (shortUrl: string) => {
        const { originalUrl } = await getOriginalUrlByShortUrl(shortUrl);

        return { originalUrl };
    }, []);

    const incrementClick = useCallback(async (shortUrl: string) => {
        const { data } = await incrementClickToShortLink(shortUrl);

        setLinks(prev =>
            prev.map(link => (link.shortUrl === shortUrl ? { ...link, clicks: data.clicks } : link))
        );
    }, []);


    const incrementClickLocal = useCallback(async (shortUrl: string) => {
        setLinks(prev => prev.map(link =>
            link.shortUrl === shortUrl ? { ...link, clicks: link.clicks ?? 0 + 1 } : link
        ));
    }, []);

    const value: LinksContextProps = { links, fetchAllLinks, createLink, removeLink, getOriginalURL, incrementClick, incrementClickLocal, page, perPage, total };
    return <LinksContext.Provider value={value}>{children}</LinksContext.Provider>;
}
