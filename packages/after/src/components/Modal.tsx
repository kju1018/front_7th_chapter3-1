// components/Modal.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "small" | "medium" | "large";
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "medium",
  showFooter = false,
  footerContent,
  children,
}) => {
  const sizeClass = {
    small: "max-w-sm",
    medium: "max-w-2xl",
    large: "max-w-4xl",
  }[size];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn(sizeClass, "max-h-[90vh] overflow-y-auto")}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        <div className="py-2">{children}</div>

        {showFooter && footerContent && (
          <DialogFooter>{footerContent}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
