import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserModalEdit } from './UserModalEdit'
import { useState } from 'react'
import type { User } from '@/services/userService'

const meta = {
  title: 'Pages/User/UserModalEdit',
  component: UserModalEdit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기존 사용자 정보를 수정하기 위한 폼 모달입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserModalEdit>

export default meta
type Story = StoryObj<typeof meta>

const mockUser: User = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
  role: 'moderator',
  status: 'active',
  createdAt: '2024-01-15',
  lastLogin: '2024-03-20',
}

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: mockUser.username,
      email: mockUser.email,
      role: mockUser.role,
      status: mockUser.status,
    })
    return (
      <UserModalEdit
        isOpen={true}
        onClose={() => console.log('Close clicked')}
        formData={formData}
        setFormData={setFormData}
        selectedItem={mockUser}
        onSubmit={() => console.log('Submit:', formData)}
      />
    )
  },
}
