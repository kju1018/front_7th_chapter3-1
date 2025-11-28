import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'
import { Label } from './Label'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input 컴포넌트는 사용자로부터 텍스트 입력을 받는 기본 폼 요소입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="email@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Cannot edit" disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error">Error State</Label>
        <Input id="error" placeholder="Invalid input" aria-invalid="true" />
        <p className="text-sm text-destructive">This field is required</p>
      </div>
    </div>
  ),
}

export const Playground: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
    disabled: false,
  },
}
