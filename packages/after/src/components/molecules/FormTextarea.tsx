import type React from 'react';

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
  const textareaClasses = ['form-textarea', error && 'error', className].filter(Boolean).join(' ');
  const helperClasses = ['form-helper-text', error && 'error'].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}

      <textarea
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        onChange={(e) => {
          rest.onChange?.(e);
          onValueChange?.(e.target.value);
        }}
        {...rest}
      />

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className="form-helper-text">{helpText}</span>}
    </div>
  );
};
