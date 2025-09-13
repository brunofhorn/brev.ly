import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap",
    "font-semibold transition-colors select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:brightness-95",
        secondary: "bg-gray-200 text-gray-600 hover:bg-gray-300",
        outline:
          "border border-gray-300 bg-white text-foreground hover:bg-gray-100",
        ghost: "bg-transparent text-foreground hover:bg-gray-100",
        destructive: "bg-danger text-white hover:brightness-95",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-sm",
        md: "h-11 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-6 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
      full: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
