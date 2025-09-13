import type { HandleLoadingParams, ILoading } from "@/types/loadings";
import { createContext, useContext } from "react";

export type LoadingsContextProps = {
    loadings: ILoading;
    handleLoadings: (params: HandleLoadingParams) => void
};

export const LoadingsContext = createContext<LoadingsContextProps>({} as LoadingsContextProps);

export function useLoadingsContext() {
    const context = useContext(LoadingsContext);

    if (!context) {
        throw new Error("useLoadingsContext must be used within <LoadingsContextProvider>");
    }

    return context;
}
