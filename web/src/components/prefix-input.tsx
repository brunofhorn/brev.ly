import * as React from "react";
import { cn } from "@/lib/cn";
import type { PrefixInputProps } from "@/types/input";

export const PrefixInput = React.forwardRef<HTMLInputElement, PrefixInputProps>(
  ({ prefix, className, error, placeholder, ...props }, ref) => {
    const spanRef = React.useRef<HTMLSpanElement>(null);
    const [padLeft, setPadLeft] = React.useState(0);

    React.useLayoutEffect(() => {
      if (spanRef.current) setPadLeft(spanRef.current.offsetWidth + 30);
    }, [prefix]);

    return (
      <div className="relative w-full">
        <span
          ref={spanRef}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {prefix}
        </span>

        <input
          ref={ref}
          aria-invalid={error || undefined}
          className={cn(
            "flex h-14 w-full rounded-xl pr-4",
            "bg-white text-gray-600 placeholder:text-gray-400",
            "border-[1.5px] transition",
            error ? "border-danger" : "border-gray-300",
            "focus:outline-none focus-visible:outline-none",
            "focus:ring-0 focus-visible:ring-0",
            error ? "focus:border-danger" : "focus:border-primary",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className
          )}
          style={{ paddingLeft: padLeft || undefined }}
          placeholder={placeholder ?? "seu-codigo"}
          {...props}
        />
      </div>
    );
  }
);

PrefixInput.displayName = "PrefixInput";
