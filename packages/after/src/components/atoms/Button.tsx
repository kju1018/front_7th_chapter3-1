import React from 'react';
import { Button as ShadcnButton } from '../ui/button';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
}) => {
  return (
    <ShadcnButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      size={size}
      className={cn(fullWidth && 'w-full')}
    >
      {children}
    </ShadcnButton>
  );
};
