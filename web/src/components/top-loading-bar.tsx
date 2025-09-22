"use client";
import { useEffect, useState } from "react";

type Props = { active: boolean; height?: number };

export default function TopLoadingBar({ active }: Props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let t: NodeJS.Timeout | undefined;
        if (active) t = setTimeout(() => setShow(true), 120);
        else setShow(false);
        return () => t && clearTimeout(t);
    }, [active]);

    if (!show) return null;

    return (
        <div className="relative w-full overflow-hidden h-[3px] rounded-tl-md rounded-tr-md">
            <div className="absolute inset-0 bg-blue-500/10" />
            <div className="absolute inset-y-0 -left-1/3 w-1/3 rounded-full bg-blue-500/80 animate-tlb-slide" />
        </div>
    );
}
