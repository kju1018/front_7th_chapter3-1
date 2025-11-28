import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { Mail } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button 컴포넌트는 사용자 액션을 트리거하는 기본 UI 요소입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'destructive', 'danger', 'outline', 'secondary', 'success', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'md', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="success">Success</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabled</Button>
      <Button size="icon"><Mail /></Button>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    children: 'Playground Button',
    variant: 'default',
    size: 'md',
    disabled: false,
  },
}
