// components/Alert.tsx
import React from "react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { X } from "lucide-react";

interface DSAlertProps
  extends VariantProps<typeof alertVariants> {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
}

const alertVariants = cva(
  "relative rounded-md border p-4 flex items-start gap-3",
  {
    variants: {
      variant: {
        default: "",
        success: "border-green-300 bg-green-50 text-green-800",
        error: "border-red-300 bg-red-50 text-red-800",
        warning: "border-yellow-300 bg-yellow-50 text-yellow-800",
        info: "border-blue-300 bg-blue-50 text-blue-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const alertIconMap: Record<string, React.ReactNode> = {
  success: <span className="text-green-600">✓</span>,
  error: <span className="text-red-600">✕</span>,
  warning: <span className="text-yellow-600">⚠️</span>,
  info: <span className="text-blue-600">ℹ️</span>,
  default: <span className="text-gray-700">•</span>,
};

export function Alert({
  title,
  children,
  variant = "default",
  showIcon = true,
  onClose,
  className,
}: DSAlertProps) {
  return (
    <ShadcnAlert className={cn(alertVariants({ variant }), className)}>
      {/* Icon */}
      {showIcon && (
        <div className="text-xl leading-none">
          {alertIconMap[variant ?? 'default']}
        </div>
      )}

      <div className="flex-1">
        {title && (
          <AlertTitle className="font-semibold mb-1">
            {title}
          </AlertTitle>
        )}
        {children && (
          <AlertDescription>{children}</AlertDescription>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      )}
    </ShadcnAlert>
  );
}
