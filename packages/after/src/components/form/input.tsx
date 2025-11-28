// components/form/input.tsx
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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
    VariantProps<typeof formInputVariants> {
  label?: string;
  error?: string;
  helpText?: string;
  onChange?: (value: string) => void;
}

export function FormInput({
  label,
  error,
  helpText,
  fullWidth,
  className,
  required,
  onChange,
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
        // 🔥 핵심 수정: 이벤트 → value 로 변환해서 상위에 전달
        onChange={(e) => onChange?.(e.target.value)}
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && helpText && <p className="text-xs text-muted-foreground">{helpText}</p>}
    </div>
  );
}
