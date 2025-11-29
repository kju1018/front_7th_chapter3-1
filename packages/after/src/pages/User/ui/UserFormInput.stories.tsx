import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserFormInput } from './UserFormInput'
import { useState } from 'react'

const meta = {
  title: 'Entities/User/UserFormInput',
  component: UserFormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UserFormInput은 사용자 관련 입력 필드를 위한 도메인 특화 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fieldType: {
      control: 'select',
      options: ['username', 'email'],
    },
    checkBusinessRules: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserFormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    return (
      <div className="space-y-4">
        <UserFormInput
          name="username"
          value={username}
          onChange={setUsername}
          label="Username"
          placeholder="Enter username"
          fieldType="username"
        />
        <UserFormInput
          name="email"
          value={email}
          onChange={setEmail}
          label="Email"
          type="email"
          placeholder="email@example.com"
          fieldType="email"
        />
      </div>
    )
  },
}

export const WithBusinessRules: Story = {
  render: () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    return (
      <div className="space-y-4">
        <UserFormInput
          name="username"
          value={username}
          onChange={setUsername}
          label="Username"
          placeholder="Try 'admin' or 'root'"
          fieldType="username"
          checkBusinessRules={true}
        />
        <div className="text-xs text-muted-foreground">예약어: admin, root, system, administrator</div>

        <UserFormInput
          name="email"
          value={email}
          onChange={setEmail}
          label="Company Email"
          type="email"
          placeholder="user@company.com"
          fieldType="email"
          checkBusinessRules={true}
        />
        <div className="text-xs text-muted-foreground">허용 도메인: @company.com, @example.com</div>
      </div>
    )
  },
}

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <UserFormInput
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Enter username',
    fieldType: 'username',
    checkBusinessRules: false,
  },
}
