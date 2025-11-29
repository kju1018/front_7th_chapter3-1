import React from 'react';
import { Badge } from '@/components/ui/Badge.tsx';
import type { Post } from '@/services/postService.ts';

export const PostStatusBadge: React.FC<{ post: Post }> = ({ post }) => {
  const { status } = post;
  let variant: 'success' | 'warning' | 'secondary' = 'secondary';
  let label = '';

  switch (status) {
    case 'published':
      variant = 'success';
      label = '게시됨';
      break;
    case 'draft':
      variant = 'warning';
      label = '임시저장';
      break;
    case 'archived':
      variant = 'secondary';
      label = '보관됨';
      break;
  }

  return <Badge variant={variant}>{label}</Badge>;
};
