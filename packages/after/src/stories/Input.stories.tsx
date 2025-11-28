import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { FormInput } from '@/components/form/input';

const meta = {
  title: 'Form/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: '이메일',
    placeholder: 'example@company.com',
    fullWidth: true,
    required: false,
    helpText: '회사 이메일을 입력하세요.',
  },
} satisfies Meta<typeof FormInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledInput(props: React.ComponentProps<typeof FormInput>) {
  const [value, setValue] = useState('');

  return (
    <FormInput
      {...props}
      value={value}
      onValueChange={(v) => setValue(v)}
      onChange={(e) => setValue(e.target.value)}
      helpText={props.helpText}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
};

export const ErrorState: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    required: true,
    error: '비밀번호를 입력해주세요.',
    helpText: undefined,
  },
  render: (args) => <ControlledInput {...args} />,
};

export const WithHelper: Story = {
  args: {
    label: '닉네임',
    placeholder: '닉네임을 입력하세요',
    helpText: '2~20자 사이로 입력하세요.',
  },
  render: (args) => <ControlledInput {...args} />,
};

export const Disabled: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@company.com',
    disabled: true,
    helpText: '비활성화 상태입니다.',
  },
  render: (args) => <ControlledInput {...args} />,
};
