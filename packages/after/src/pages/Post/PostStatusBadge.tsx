import React from 'react';
import { Badge } from '@/components/atoms/Badge';
import type { Post } from '@/services/postService.ts';

export const PostStatusBadge: React.FC<{ post: Post }> = ({ post }) => {
  const { status } = post;
  let type: 'success' | 'warning' | 'secondary' = 'secondary';
  let label = '';

  switch (status) {
    case 'published':
      type = 'success';
      label = '게시됨';
      break;
    case 'draft':
      type = 'warning';
      label = '임시저장';
      break;
    case 'archived':
      type = 'secondary';
      label = '보관됨';
      break;
  }

  return <Badge type={type}>{label}</Badge>;
};
