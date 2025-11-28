import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Icon: Story = {
  args: {
    variant: 'ghost',
    size: 'icon',
    'aria-label': 'Toggle',
    children: <Sun className="h-5 w-5" />,
  },
};
