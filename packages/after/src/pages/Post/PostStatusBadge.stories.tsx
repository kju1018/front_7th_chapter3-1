import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostStatusBadge } from './PostStatusBadge'
import type { Post } from '@/services/postService'

const meta = {
  title: 'Entities/Post/PostStatusBadge',
  component: PostStatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PostStatusBadge는 게시글 상태(published, draft, archived)를 시각적으로 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

const createPost = (status: Post['status']): Post => ({
  id: 1,
  title: 'Sample Post',
  content: 'This is a sample post content',
  author: 'John Doe',
  category: 'development',
  status,
  views: 0,
  createdAt: '2024-01-01',
})

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <PostStatusBadge post={createPost('published')} />
        <span className="text-xs text-muted-foreground">published</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PostStatusBadge post={createPost('draft')} />
        <span className="text-xs text-muted-foreground">draft</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PostStatusBadge post={createPost('archived')} />
        <span className="text-xs text-muted-foreground">archived</span>
      </div>
    </div>
  ),
}
