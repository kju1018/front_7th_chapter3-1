import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserTable } from './UserTable'
import type { User } from '@/services/userService'

const meta = {
  title: 'Pages/User/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '사용자 목록을 표시하는 테이블 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserTable>

export default meta
type Story = StoryObj<typeof meta>

const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-03-20',
  },
  {
    id: 2,
    username: 'john_doe',
    email: 'john@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-05',
    lastLogin: '2024-03-19',
  },
  {
    id: 3,
    username: 'jane_smith',
    email: 'jane@example.com',
    role: 'moderator',
    status: 'active',
    createdAt: '2024-01-10',
    lastLogin: '2024-03-18',
  },
  {
    id: 4,
    username: 'bob_inactive',
    email: 'bob@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-15',
  },
  {
    id: 5,
    username: 'suspended_user',
    email: 'suspended@example.com',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-02-01',
    lastLogin: '2024-02-15',
  },
]

export const Default: Story = {
  args: {
    data: mockUsers,
    striped: true,
    hover: true,
    onEdit: (user) => console.log('Edit:', user),
    onDelete: (id) => console.log('Delete:', id),
  },
}

export const Empty: Story = {
  args: {
    data: [],
    striped: false,
    hover: true,
    onEdit: (user) => console.log('Edit:', user),
    onDelete: (id) => console.log('Delete:', id),
  },
}

export const AllRoles: Story = {
  args: {
    data: [
      mockUsers.find((u) => u.role === 'admin')!,
      mockUsers.find((u) => u.role === 'moderator')!,
      mockUsers.find((u) => u.role === 'user')!,
    ],
    striped: true,
    hover: true,
    onEdit: (user) => console.log('Edit:', user),
    onDelete: (id) => console.log('Delete:', id),
  },
}

export const AllStatuses: Story = {
  args: {
    data: [
      mockUsers.find((u) => u.status === 'active')!,
      mockUsers.find((u) => u.status === 'inactive')!,
      mockUsers.find((u) => u.status === 'suspended')!,
    ],
    striped: true,
    hover: true,
    onEdit: (user) => console.log('Edit:', user),
    onDelete: (id) => console.log('Delete:', id),
  },
}
