import { useCallback, useMemo, useState } from "react";
import type { HandleLoadingParams, ILoading } from "@/types/loadings";
import { LoadingsContext } from "../loadings-context";

type LoadingsContextProviderProps = { children: React.ReactNode };

export default function LoadingsContextProvider({ children }: LoadingsContextProviderProps) {
    const [loadings, setLoadings] = useState<ILoading>({
        fetchLinks: false,
        registerLink: false,
        deleteLink: false
    });

    const handleLoadings = useCallback(({ key, value }: HandleLoadingParams) => {
        setLoadings(prev => {
            if (prev[key] === value) return prev;
            return { ...prev, [key]: value };
        });
    }, []);

    const value = useMemo(() => ({ loadings, handleLoadings }), [loadings, handleLoadings]);

    return <LoadingsContext.Provider value={value}>{children}</LoadingsContext.Provider>;
}
