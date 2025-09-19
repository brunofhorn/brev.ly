import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import Button from "@/components/button";
import { cn } from "@/lib/cn";
import type { PopConfirmProps } from "@/types/pop-confirm";

export function Popconfirm({
    children,
    title = "Excluir item?",
    description = "Essa ação não pode ser desfeita.",
    confirmText = "Excluir",
    cancelText = "Cancelar",
    onConfirm,
    onCancel,
    side = "bottom",
    align = "end",
    className,
}: PopConfirmProps) {
    const [open, setOpen] = React.useState(false);

    async function handleConfirm() {
        await onConfirm();
        setOpen(false);
    }

    function handleCancel() {
        onCancel?.();
        setOpen(false);
    }

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>{children}</Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    side={side}
                    align={align}
                    sideOffset={8}
                    className={cn(
                        "z-50 w-72 rounded-xl border border-gray-300 bg-white p-3 shadow-lg",
                        "data-[state=open]:animate-in data-[state=closed]:animate-out",
                        className
                    )}
                >
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-foreground">{title}</p>
                        {description && <p className="text-xs text-gray-500">{description}</p>}
                        <div className="mt-2 flex items-center justify-end gap-2">
                            <Button variant="secondary" size="sm" onClick={handleCancel}>
                                {cancelText}
                            </Button>
                            <Button variant="primary" size="sm" onClick={handleConfirm}>
                                {confirmText}
                            </Button>
                        </div>
                    </div>
                    <Popover.Arrow className="fill-white drop-shadow" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
