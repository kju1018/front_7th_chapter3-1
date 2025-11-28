// packages/after/src/stories/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';

// Use the component props as the args shape
type ModalProps = React.ComponentProps<typeof Modal>;

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    showFooter: {
      control: 'boolean',
    },
  },
  // Provide required props so stories don't error (isOpen, onClose, children)
  args: {
    isOpen: true,
    onClose: () => {},
    title: '모달 제목',
    size: 'medium',
    showFooter: true,
    children: '여기에 모달 본문 내용을 넣을 수 있습니다.',
  },
} satisfies Meta<ModalProps>;

export default meta;

type Story = StoryObj<ModalProps>;

function ModalWithState(args: ModalProps) {
  const [open, setOpen] = useState(args.isOpen);
  const {
    size = 'medium',
    showFooter = true,
    title = '모달 제목',
    children,
    footerContent,
    ...rest
  } = args;

  const content =
    children ?? (
      <>
        <p>여기에 모달 본문 내용을 넣을 수 있습니다.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          폼, 설명 텍스트, 확인 메시지 등 원하는 내용을 배치해 보세요.
        </p>
      </>
    );

  return (
    <Modal
      {...rest}
      isOpen={open}
      onClose={() => {
        setOpen(false);
        args.onClose?.();
      }}
      size={size}
      showFooter={showFooter}
      title={title}
      footerContent={
        footerContent ??
        (showFooter ? (
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </div>
        ) : undefined)
      }
    >
      {content}
    </Modal>
  );
}

export const Default: Story = {
  render: (args) => <ModalWithState {...args} />,
};

export const Small: Story = {
  args: {
    ...meta.args,
    size: 'small',
    title: '작은 모달',
  },
  render: (args) => <ModalWithState {...args} />,
};

export const Large: Story = {
  args: {
    ...meta.args,
    size: 'large',
    title: '큰 모달',
  },
  render: (args) => <ModalWithState {...args} />,
};

export const WithoutFooter: Story = {
  args: {
    ...meta.args,
    showFooter: false,
    title: '푸터 없는 모달',
  },
  render: (args) => <ModalWithState {...args} />,
};
