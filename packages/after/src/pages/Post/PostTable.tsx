import React from 'react';
import { Table, type Column } from '../../components/organisms/Table';
import { Button, Badge } from '@/components/atoms';
import { PostStatusBadge } from './PostStatusBadge';
import type { Post } from '@/services/postService.ts';

interface PostTableProps {
  data: Post[];
  striped?: boolean;
  hover?: boolean;
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onPublish: (id: number) => void;
  onArchive: (id: number) => void;
  onRestore: (id: number) => void;
}

const POST_TABLE_COLUMNS: Column[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'title', header: '제목' },
  { key: 'author', header: '작성자', width: '120px' },
  { key: 'category', header: '카테고리', width: '140px' },
  { key: 'status', header: '상태', width: '120px' },
  { key: 'views', header: '조회수', width: '100px' },
  { key: 'createdAt', header: '작성일', width: '120px' },
  { key: 'actions', header: '관리', width: '250px' },
];

export const PostTable: React.FC<PostTableProps> = ({
  data,
  striped,
  hover,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const renderCell = (row: Post, columnKey: string) => {
    const value = row[columnKey as keyof Post];

    if (columnKey === 'category') {
      const type =
        value === 'development' ? 'primary' :
        value === 'design' ? 'info' :
        value === 'accessibility' ? 'danger' :
        'secondary';
      return <Badge type={type} pill>{String(value)}</Badge>;
    }

    if (columnKey === 'status') {
      return <PostStatusBadge post={row} />;
    }

    if (columnKey === 'views') {
      return row.views.toLocaleString();
    }

    if (columnKey === 'actions') {
      return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button size="sm" variant="primary" onClick={() => onEdit(row)}>
            수정
          </Button>
          {row.status === 'draft' && (
            <Button
              size="sm"
              variant="success"
              onClick={() => onPublish(row.id)}
            >
              게시
            </Button>
          )}
          {row.status === 'published' && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onArchive(row.id)}
            >
              보관
            </Button>
          )}
          {row.status === 'archived' && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => onRestore(row.id)}
            >
              복원
            </Button>
          )}
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
    <Table
      columns={POST_TABLE_COLUMNS}
      data={data}
      striped={striped}
      hover={hover}
      renderCell={renderCell}
    />
  );
};
