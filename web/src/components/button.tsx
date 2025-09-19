import * as React from "react";
import { cx } from "@/lib/cx";
import type { ButtonSize, ButtonVariant } from "@/types/button";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  variant = "primary",
  size = "lg",
  full,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold select-none cursor-pointer " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-primary/40 disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-sm",
    lg: "h-14 px-6 text-base",
    icon: "h-10 w-10 p-0",
  };

  const variants: Record<ButtonVariant, string> = {
    primary: cx(
      "bg-primary text-primary-foreground",
      "hover:bg-blue-dark",
      "disabled:bg-blue-base/50"
    ),
    secondary: cx(
      "bg-gray-200 text-gray-500",
      "hover:bg-gray-300 hover:ring-2 hover:ring-primary/35 hover:ring-offset-2 hover:ring-offset-gray-100",
      "disabled:bg-gray-200 disabled:text-gray-400 rounded"
    ),
  };

  return (
    <button
      className={cx(
        base,
        sizes[size],
        variants[variant],
        full && "w-full",
        className
      )}
      {...rest}
    >
      {leftIcon && <span className={cx(size === "sm" ? "mr-2 text-sm" : "mr-2")}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={cx(size === "sm" ? "ml-2 text-sm" : "ml-2")}>{rightIcon}</span>}
    </button>
  );
}