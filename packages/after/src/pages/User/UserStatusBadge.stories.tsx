import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserStatusBadge } from './UserStatusBadge'
import type { User } from '@/services/userService'

const meta = {
  title: 'Entities/User/UserStatusBadge',
  component: UserStatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UserStatusBadge는 사용자 상태(active, inactive, suspended)를 시각적으로 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

const createUser = (status: User['status']): User => ({
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role: 'user',
  status,
  createdAt: '2024-01-01',
})

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <UserStatusBadge user={createUser('active')} />
        <span className="text-xs text-muted-foreground">active</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserStatusBadge user={createUser('inactive')} />
        <span className="text-xs text-muted-foreground">inactive</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserStatusBadge user={createUser('suspended')} />
        <span className="text-xs text-muted-foreground">suspended</span>
      </div>
    </div>
  ),
}
