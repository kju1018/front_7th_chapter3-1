import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserModalCreate } from './UserModalCreate'
import { useState } from 'react'

const meta = {
  title: 'Pages/User/UserModalCreate',
  component: UserModalCreate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '새 사용자를 생성하기 위한 폼 모달입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserModalCreate>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => {
    const [formData, setFormData] = useState({})
    return (
      <UserModalCreate
        isOpen={true}
        onClose={() => console.log('Close clicked')}
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => console.log('Submit:', formData)}
      />
    )
  },
}

export const Filled: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: 'johndoe',
      email: 'john@example.com',
      role: 'moderator' as const,
      status: 'active' as const,
    })
    return (
      <UserModalCreate
        isOpen={true}
        onClose={() => console.log('Close clicked')}
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => console.log('Submit:', formData)}
      />
    )
  },
}
