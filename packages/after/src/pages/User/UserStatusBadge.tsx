import React from 'react';
import { Badge } from '@/components/atoms';
import type { User } from '@/services/userService.ts';

export const UserStatusBadge: React.FC<{ user: User }> = ({ user }) => {
  const { status } = user;
  let type: 'success' | 'warning' | 'danger' = 'success';
  let label = '';

  switch (status) {
    case 'active':
      type = 'success';
      label = '활성';
      break;
    case 'inactive':
      type = 'warning';
      label = '비활성';
      break;
    case 'suspended':
      type = 'danger';
      label = '정지';
      break;
  }

  return <Badge type={type}>{label}</Badge>;
};
