import React, { useState } from 'react';
import { FormInput } from '@/components/forms/FormInput';

interface UserFormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  width?: 'small' | 'medium' | 'large' | 'full';
  fieldType: 'username' | 'email';
  checkBusinessRules?: boolean;
}

export const UserFormInput: React.FC<UserFormInputProps> = ({
  name,
  value,
  onChange,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  width = 'full',
  fieldType,
  checkBusinessRules = false,
}) => {
  const [error, setError] = useState('');

  const validateField = (val: string) => {
    setError('');

    if (!val) return;

    if (fieldType === 'username') {
      if (val.length < 3) {
        setError('사용자명은 3자 이상이어야 합니다');
      } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setError('영문, 숫자, 언더스코어만 사용 가능합니다');
      } else if (val.length > 20) {
        setError('사용자명은 20자 이하여야 합니다');
      }

      // 비즈니스 규칙: 예약어 체크
      if (checkBusinessRules) {
        const reservedWords = ['admin', 'root', 'system', 'administrator'];
        if (reservedWords.includes(val.toLowerCase())) {
          setError('예약된 사용자명입니다');
        }
      }
    } else if (fieldType === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setError('올바른 이메일 형식이 아닙니다');
      }

      // 비즈니스 규칙: 회사 도메인만
      if (checkBusinessRules) {
        if (!val.endsWith('@company.com') && !val.endsWith('@example.com')) {
          setError('회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다');
        }
      }
    }
  };

  const handleChange = (val: string) => {
    onChange(val);
    validateField(val);
  };

  return (
    <FormInput
      name={name}
      value={value}
      onChange={handleChange}
      label={label}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={error}
      width={width}
    />
  );
};
