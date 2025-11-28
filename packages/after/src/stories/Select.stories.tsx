import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';

import { FormSelect } from '@/components/form/select';

const meta = {
  title: 'Form/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: '역할',
    placeholder: '역할을 선택하세요',
    options: [
      { value: 'designer', label: '디자이너' },
      { value: 'developer', label: '개발자' },
      { value: 'pm', label: 'PM' },
      { value: 'qa', label: 'QA' },
    ],
    size: 'md',
    required: false,
    disabled: false,
    helpText: '역할을 선택해 주세요.',
  },
} satisfies Meta<typeof FormSelect>;

export default meta;

type Story = StoryObj<typeof meta>;

function ControlledSelect(props: React.ComponentProps<typeof FormSelect>) {
  const [value, setValue] = useState('');

  return (
    <FormSelect
      {...props}
      value={value}
      onValueChange={(v) => setValue(v)}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledSelect {...args} />,
};

export const ErrorState: Story = {
  args: {
    label: '역할',
    placeholder: '역할을 선택하세요',
    required: true,
    error: '역할은 필수 항목입니다.',
    helpText: undefined,
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helpText: '현재 선택할 수 없는 상태입니다.',
  },
  render: (args) => <ControlledSelect {...args} />,
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: '부서',
    placeholder: '부서를 선택하세요',
    helpText: '큰 사이즈로 표시됩니다.',
    options: [
      { value: 'planning', label: '기획' },
      { value: 'engineering', label: '엔지니어링' },
      { value: 'design', label: '디자인' },
    ],
  },
  render: (args) => <ControlledSelect {...args} />,
};
