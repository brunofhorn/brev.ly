import * as React from "react";
import { cn } from "@/lib/cn";

type Props = React.LabelHTMLAttributes<HTMLLabelElement> & {
  invalid?: boolean;
};

export function FieldLabel({ invalid, className, htmlFor, children, ...props }: Props) {
    return (
        <label
            htmlFor={htmlFor}
            className={cn(
                "mb-2 inline-block text-xs font-semibold uppercase tracking-wide transition-colors",
                invalid ? "text-danger" : "text-gray-400 group-focus-within/field:text-primary",
                className
            )}
            {...props}
        >
            {children}
        </label>
    );
}
