import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostTable } from './PostTable'
import type { Post } from '@/services/postService'

const meta = {
  title: 'Pages/Post/PostTable',
  component: PostTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '게시글 목록을 표시하는 테이블 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-7xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostTable>

export default meta
type Story = StoryObj<typeof meta>

const mockPosts: Post[] = [
  {
    id: 1,
    title: 'React 19 새로운 기능 소개',
    content: 'React 19에서는 많은 새로운 기능들이 추가되었습니다...',
    author: 'John Doe',
    category: 'development',
    status: 'published',
    views: 1234,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-20',
  },
  {
    id: 2,
    title: '디자인 시스템 구축하기',
    content: '효과적인 디자인 시스템을 구축하는 방법을 알아봅시다.',
    author: 'Jane Designer',
    category: 'design',
    status: 'published',
    views: 5678,
    createdAt: '2024-02-01',
    updatedAt: '2024-03-19',
  },
  {
    id: 3,
    title: '웹 접근성 가이드라인',
    content: 'WCAG 2.1 기준을 충족하는 웹사이트 만들기',
    author: 'Alex A11y',
    category: 'accessibility',
    status: 'published',
    views: 3456,
    createdAt: '2024-02-10',
    updatedAt: '2024-03-18',
  },
  {
    id: 4,
    title: '작성 중인 게시글',
    content: '아직 완성되지 않은 게시글입니다.',
    author: 'Bob Writer',
    category: 'development',
    status: 'draft',
    views: 0,
    createdAt: '2024-03-01',
  },
  {
    id: 5,
    title: '보관된 오래된 글',
    content: '오래된 게시글이지만 보관되었습니다.',
    author: 'Old Author',
    category: 'design',
    status: 'archived',
    views: 9999,
    createdAt: '2023-06-15',
    updatedAt: '2023-12-30',
  },
]

export const Default: Story = {
  args: {
    data: mockPosts,
    striped: true,
    hover: true,
    onEdit: (post) => console.log('Edit:', post),
    onDelete: (id) => console.log('Delete:', id),
    onPublish: (id) => console.log('Publish:', id),
    onArchive: (id) => console.log('Archive:', id),
    onRestore: (id) => console.log('Restore:', id),
  },
}

export const Empty: Story = {
  args: {
    data: [],
    striped: false,
    hover: true,
    onEdit: (post) => console.log('Edit:', post),
    onDelete: (id) => console.log('Delete:', id),
    onPublish: (id) => console.log('Publish:', id),
    onArchive: (id) => console.log('Archive:', id),
    onRestore: (id) => console.log('Restore:', id),
  },
}

export const AllCategories: Story = {
  args: {
    data: [
      mockPosts.find((p) => p.category === 'development')!,
      mockPosts.find((p) => p.category === 'design')!,
      mockPosts.find((p) => p.category === 'accessibility')!,
    ],
    striped: true,
    hover: true,
    onEdit: (post) => console.log('Edit:', post),
    onDelete: (id) => console.log('Delete:', id),
    onPublish: (id) => console.log('Publish:', id),
    onArchive: (id) => console.log('Archive:', id),
    onRestore: (id) => console.log('Restore:', id),
  },
}

export const AllStatuses: Story = {
  args: {
    data: [
      mockPosts.find((p) => p.status === 'published')!,
      mockPosts.find((p) => p.status === 'draft')!,
      mockPosts.find((p) => p.status === 'archived')!,
    ],
    striped: true,
    hover: true,
    onEdit: (post) => console.log('Edit:', post),
    onDelete: (id) => console.log('Delete:', id),
    onPublish: (id) => console.log('Publish:', id),
    onArchive: (id) => console.log('Archive:', id),
    onRestore: (id) => console.log('Restore:', id),
  },
}
