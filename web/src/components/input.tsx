import * as React from "react";
import { cn } from "@/lib/cn";
import type { InputProps } from "@/types/input";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = "text", error, ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                aria-invalid={error || undefined}
                className={cn(
                    "flex h-14 w-full rounded-xl px-4",
                    "bg-white text-gray-600 placeholder:text-gray-400",
                    "border-[1.5px] transition",
                    error ? "border-danger" : "border-gray-300",
                    "focus:outline-none focus-visible:outline-none",
                    "focus:ring-0 focus-visible:ring-0",
                    error ? "focus:border-danger" : "focus:border-primary",
                    "disabled:cursor-not-allowed disabled:opacity-60",
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";
