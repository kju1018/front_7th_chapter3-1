import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { PostManagementPage } from '../Post/PostManagementPage.tsx';

describe('PostManagementPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('게시글이 테이블에 표시된다', async () => {
    render(<PostManagementPage />);

    // 기존 샘플 게시글이 표시되는지 확인
    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });
});
