import type { LinksSkeletonProps } from "@/types/links";

export function LinksSkeleton({ rows = 5 }: LinksSkeletonProps) {
    return (
        <ul className="divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, i) => (
                <li key={i} className="py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 w-full">
                            <div className="h-4 w-40 rounded bg-gray-200 animate-pulse mb-2" />
                            <div className="h-3 w-64 rounded bg-gray-200 animate-pulse" />
                        </div>

                        <div className="flex shrink-0 items-center gap-3">
                            <div className="h-8 w-20 rounded bg-gray-200 animate-pulse" />
                            <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
                            <div className="h-8 w-8 rounded bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
