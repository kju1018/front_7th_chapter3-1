import React, { useState } from 'react';
import { FormInput } from '@/components/molecules/FormInput';

interface PostFormInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'text' | 'email' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  width?: 'small' | 'medium' | 'large' | 'full';
  fieldType: 'postTitle' | 'author' | 'slug';
  checkBusinessRules?: boolean;
}

export const PostFormInput: React.FC<PostFormInputProps> = ({
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

    if (fieldType === 'postTitle') {
      if (val.length < 5) {
        setError('제목은 5자 이상이어야 합니다');
      } else if (val.length > 100) {
        setError('제목은 100자 이하여야 합니다');
      }

      // 비즈니스 규칙: 금칙어 체크
      if (checkBusinessRules) {
        const bannedWords = ['광고', '스팸', '홍보'];
        const hasBannedWord = bannedWords.some(word => val.includes(word));
        if (hasBannedWord) {
          setError('제목에 금지된 단어가 포함되어 있습니다');
        }
      }
    } else if (fieldType === 'slug') {
      if (!/^[a-z0-9-]+$/.test(val)) {
        setError('소문자, 숫자, 하이픈만 사용 가능합니다');
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
