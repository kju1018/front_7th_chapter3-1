import React from 'react';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { UserRoleBadge } from './ui/UserRoleBadge.tsx';
import { UserStatusBadge } from './ui/UserStatusBadge.tsx';
import type { User } from '@/services/userService.ts';

interface UserTableProps {
  data: User[];
  striped?: boolean;
  hover?: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const USER_TABLE_COLUMNS: Column[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'username', header: '사용자명', width: '150px' },
  { key: 'email', header: '이메일' },
  { key: 'role', header: '역할', width: '120px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'createdAt', header: '생성일', width: '120px' },
  { key: 'lastLogin', header: '마지막 로그인', width: '140px' },
  { key: 'actions', header: '관리', width: '200px' },
];

export const UserTable: React.FC<UserTableProps> = ({
  data,
  striped,
  hover,
  onEdit,
  onDelete,
}) => {
  const renderCell = (row: User, columnKey: string) => {
    const value = row[columnKey as keyof User];

    if (columnKey === 'role') {
      return <UserRoleBadge user={row} />;
    }

    if (columnKey === 'status') {
      return <UserStatusBadge user={row} />;
    }

    if (columnKey === 'lastLogin') {
      return value || '-';
    }

    if (columnKey === 'actions') {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm" variant="primary" onClick={() => onEdit(row)}>
            수정
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(row.id)}>
            삭제
          </Button>
        </div>
      );
    }

    if (React.isValidElement(value)) {
      return value;
    }

    return String(value);
  };

  return (
    <DataTable
      columns={USER_TABLE_COLUMNS}
      data={data}
      striped={striped}
      hover={hover}
      renderCell={renderCell}
    />
  );
};
