import React from 'react';

interface FormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  width?: 'small' | 'medium' | 'large' | 'full';
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helpText,
  width = 'full',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = ['form-input', error && 'error', `input-width-${width}`].filter(Boolean).join(' ');
  const helperClasses = ['form-helper-text', error && 'error'].filter(Boolean).join(' ');

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
      />

      {error && <span className={helperClasses}>{error}</span>}
      {helpText && !error && <span className="form-helper-text">{helpText}</span>}
    </div>
  );
};
