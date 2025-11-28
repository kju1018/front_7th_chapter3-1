// components/form/select.tsx

import {
    NativeSelect,
    NativeSelectOption,
  } from "@/components/ui/native-select";
  import { cva, type VariantProps } from "class-variance-authority";
  import { cn } from "@/lib/utils";
  
  interface Option {
    value: string;
    label: string;
  }
  
  const selectVariants = cva(
    "w-full", // wrapper-level class if needed
    {
      variants: {
        size: {
          sm: "h-8 text-xs",
          md: "h-10 text-sm",
          lg: "h-11 text-base",
        },
      },
      defaultVariants: {
        size: "md",
      },
    }
  );
  
  interface FormSelectProps extends VariantProps<typeof selectVariants> {
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helpText?: string;
    className?: string;
  }
  
  export function FormSelect({
    name,
    value,
    onChange,
    options,
    label,
    placeholder = "선택하세요",
    required = false,
    disabled = false,
    error,
    helpText,
    size = "md",
    className,
  }: FormSelectProps) {
    return (
      <div className={cn("flex flex-col gap-1 w-full", className)}>
        {/* Label */}
        {label && (
          <label className="text-sm font-medium" htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
  
        {/* Wrapper around shadcn select */}
        <div className="w-full"> 
        <NativeSelect
          name={name}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            selectVariants({ size }),
            error &&
              "border-destructive focus-visible:ring-destructive/40 focus-visible:border-destructive"
          )}
        >
          {/* Placeholder */}
          {placeholder && (
            <NativeSelectOption value="" disabled hidden>
              {placeholder}
            </NativeSelectOption>
          )}
  
          {/* Options */}
          {options.map((opt) => (
            <NativeSelectOption key={opt.value} value={opt.value}>
              {opt.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
  
        {/* Error */}
        {error && <p className="text-xs text-destructive">{error}</p>}
  
        {/* Help Text */}
        {!error && helpText && (
          <p className="text-xs text-muted-foreground">{helpText}</p>
        )}
      </div>
      </div>
    );
  }
  