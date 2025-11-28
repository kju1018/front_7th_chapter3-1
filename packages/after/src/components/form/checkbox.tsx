import type React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const checkboxWrapper = cva("flex items-start gap-2", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface FormCheckboxProps
  extends Omit<React.ComponentProps<typeof Checkbox>, "onCheckedChange">,
    VariantProps<typeof checkboxWrapper> {
  label: string;
  hint?: string;
  error?: string;
  onValueChange?: (checked: boolean) => void;
}

export function FormCheckbox({
  label,
  hint,
  error,
  disabled,
  className,
  size,
  onValueChange,
  ...props
}: FormCheckboxProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className={checkboxWrapper({ size })}>
        <Checkbox
          disabled={disabled}
          aria-invalid={!!error}
          onCheckedChange={(val) => onValueChange?.(!!val)}
          {...props}
        />
        <span className={cn("text-foreground", disabled && "text-muted-foreground")}>
          {label}
        </span>
      </label>

      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
