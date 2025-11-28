// packages/after/src/stories/Alert.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@/components/Alert';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    showIcon: {
      control: 'boolean',
    },
    onClose: { action: 'closed' },
  },
  args: {
    title: '알림',
    children: '알림 메시지 내용을 입력하세요.',
    variant: 'default',
    showIcon: true,
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '성공',
    children: '정상적으로 처리되었습니다.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: '오류',
    children: '문제가 발생했습니다. 다시 시도해주세요.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '주의',
    children: '확인 후 진행해주세요.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: '정보',
    children: '참고용 안내 메시지입니다.',
  },
};
