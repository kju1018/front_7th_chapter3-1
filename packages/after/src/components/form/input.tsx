// components/form/input.tsx
import type React from "react";
import { Input as ShadcnInput } from "@/components/ui/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const formInputVariants = cva("flex flex-col gap-1 w-full", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

interface FormInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof formInputVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  onValueChange?: (value: string) => void;
}

export function FormInput({
  label,
  error,
  helpText,
  fullWidth,
  className,
  required,
  onValueChange,
  ...rest
}: FormInputProps) {
  return (
    <div className={cn(formInputVariants({ fullWidth }), className)}>
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      <ShadcnInput
        aria-invalid={!!error}
        required={required}
        {...rest}
        onChange={(e) => {
          rest.onChange?.(e);
          onValueChange?.(e.target.value);
        }}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
}
