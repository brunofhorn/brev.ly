import type { PaginationProps } from '@/types/pagination';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export function Pagination({ page, perPage, total, onPageChange }: PaginationProps) {
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const canPrev = page > 1;
    const canNext = page < totalPages;

    const pages: number[] = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);
    for (let p = start; p <= end; p++) pages.push(p);

    return (
        <div className="mt-6 flex items-center justify-between">
            <div>
                <span className='text-style-xs'>Mostrando {perPage} de {total} links</span>
            </div>
            <div className='flex flex-row gap-1.5 justify-end items-center'>
                <button
                    type="button"
                    className="px-3 h-9 rounded-md cursor-pointer bg-gray-200 text-gray-600 disabled:opacity-50"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!canPrev}
                >
                    <FiChevronLeft />
                </button>

                <div className="flex items-center gap-1">
                    {start > 1 && (
                        <>
                            <PageButton n={1} active={page === 1} onClick={() => onPageChange(1)} />
                            {start > 2 && <span className="px-1 text-gray-400">…</span>}
                        </>
                    )}

                    {pages.map((n) => (
                        <PageButton key={n} n={n} active={n === page} onClick={() => onPageChange(n)} />
                    ))}

                    {end < totalPages && (
                        <>
                            {end < totalPages - 1 && <span className="px-1 text-gray-400">…</span>}
                            <PageButton n={totalPages} active={page === totalPages} onClick={() => onPageChange(totalPages)} />
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className="px-3 h-9 rounded-md cursor-pointer bg-gray-200 text-gray-600 disabled:opacity-50"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!canNext}
                >
                    <FiChevronRight />
                </button>
            </div>
        </div>
    );
}

function PageButton({ n, active, onClick }: { n: number; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={
                active
                    ? "min-w-9 h-9 px-3 rounded-md cursor-pointer bg-primary text-white"
                    : "min-w-9 h-9 px-3 rounded-md cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300"
            }
        >
            {n}
        </button>
    );
}
