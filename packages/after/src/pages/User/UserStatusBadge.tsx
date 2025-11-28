import React from 'react';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@/services/userService.ts';

export const UserStatusBadge: React.FC<{ user: User }> = ({ user }) => {
  const { status } = user;
  let variant: 'success' | 'warning' | 'danger' = 'success';
  let label = '';

  switch (status) {
    case 'active':
      variant = 'success';
      label = '활성';
      break;
    case 'inactive':
      variant = 'warning';
      label = '비활성';
      break;
    case 'suspended':
      variant = 'danger';
      label = '정지';
      break;
  }

  return <Badge variant={variant}>{label}</Badge>;
};
