import React from 'react';
import { Checkbox } from '../ui/Checkbox';
import { Label } from '../ui/Label';

interface FormCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  error?: string;
  hint?: string;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  checked,
  onChange,
  label,
  disabled = false,
  error,
  hint,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id={name}
          name={name}
          checked={checked}
          onCheckedChange={(value) => onChange(value === true)}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
        />
        <Label
          htmlFor={name}
          className={error ? 'text-destructive' : ''}
        >
          {label}
        </Label>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-muted-foreground">{hint}</p>
      )}
    </div>
  );
};
