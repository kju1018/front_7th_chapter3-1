import React from 'react';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@/services/userService.ts';

export const UserRoleBadge: React.FC<{ user: User }> = ({ user }) => {
  const { role } = user;
  let variant: 'danger' | 'warning' | 'primary' | 'secondary' = 'primary';
  let label = '';

  switch (role) {
    case 'admin':
      variant = 'danger';
      label = '관리자';
      break;
    case 'moderator':
      variant = 'warning';
      label = '운영자';
      break;
    case 'user':
      variant = 'primary';
      label = '사용자';
      break;
    default:
      variant = 'secondary';
      label = '게스트';
      break;
  }

  return <Badge variant={variant}>{label}</Badge>;
};
