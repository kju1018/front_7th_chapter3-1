import type { Meta, StoryObj } from '@storybook/react-vite'
import { UserRoleBadge } from './UserRoleBadge'
import type { User } from '@/services/userService'

const meta = {
  title: 'Entities/User/UserRoleBadge',
  component: UserRoleBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UserRoleBadge는 사용자 권한(admin, moderator, user, guest)을 시각적으로 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserRoleBadge>

export default meta
type Story = StoryObj<typeof meta>

const createUser = (role: User['role']): User => ({
  id: 1,
  username: 'testuser',
  email: 'test@example.com',
  role,
  status: 'active',
  createdAt: '2024-01-01',
})

export const AllRoles: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <UserRoleBadge user={createUser('admin')} />
        <span className="text-xs text-muted-foreground">admin</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserRoleBadge user={createUser('moderator')} />
        <span className="text-xs text-muted-foreground">moderator</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <UserRoleBadge user={createUser('user')} />
        <span className="text-xs text-muted-foreground">user</span>
      </div>
    </div>
  ),
}
