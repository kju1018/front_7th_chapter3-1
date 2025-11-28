import React from 'react';
import { Badge as ShadcnBadge } from '../ui/badge';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  pill?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  type = 'primary',
  size = 'medium',
  pill = false,
}) => {
  return (
    <ShadcnBadge variant={type}>
      {children}
    </ShadcnBadge>
  );
};
