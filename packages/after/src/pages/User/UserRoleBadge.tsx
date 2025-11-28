import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import type { User } from '@/services/userService.ts';

export const UserRoleBadge: React.FC<{ user: User }> = ({ user }) => {
  const { role } = user;
  let type: 'danger' | 'warning' | 'primary' | 'secondary' = 'primary';
  let label = '';

  switch (role) {
    case 'admin':
      type = 'danger';
      label = '관리자';
      break;
    case 'moderator':
      type = 'warning';
      label = '운영자';
      break;
    case 'user':
      type = 'primary';
      label = '사용자';
      break;
    case 'guest':
      type = 'secondary';
      label = '게스트';
      break;
  }

  return <Badge type={type}>{label}</Badge>;
};
