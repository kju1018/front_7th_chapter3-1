import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ManagementPage } from '../ManagementPage';

describe('ManagementPage - Tab Navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('게시글 탭과 사용자 탭 간 전환이 정상 작동한다', async () => {
    const user = userEvent.setup();
    render(<ManagementPage />);

    // 게시글 탭이 기본으로 활성화되어 있는지 확인
    const postTab = screen.getByRole('tab', { name: '게시글 관리' });
    const userTab = screen.getByRole('tab', { name: '사용자 관리' });

    expect(postTab).toBeInTheDocument();
    expect(userTab).toBeInTheDocument();

    // 사용자 탭으로 전환
    await user.click(userTab);

    // 사용자 관리 페이지가 렌더링되었는지 확인
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    // 게시글 탭으로 다시 전환
    await user.click(postTab);

    // 게시글 관리 페이지가 렌더링되었는지 확인
    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });
});
