import type React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  onValueChange?: (value: string) => void;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  rows = 4,
  className,
  onValueChange,
  ...rest
}) => {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}

      <Textarea
        aria-invalid={!!error}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={cn(error && "aria-invalid:border-destructive aria-invalid:ring-destructive/30", className)}
        onChange={(e) => {
          rest.onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        {...rest}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
};
