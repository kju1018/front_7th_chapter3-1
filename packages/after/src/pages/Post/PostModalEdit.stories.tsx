import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostModalEdit } from './PostModalEdit'
import { useState } from 'react'
import type { Post } from '@/services/postService'

const meta = {
  title: 'Pages/Post/PostModalEdit',
  component: PostModalEdit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기존 게시글을 수정하기 위한 폼 모달입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostModalEdit>

export default meta
type Story = StoryObj<typeof meta>

const mockPost: Post = {
  id: 1,
  title: 'React 19 새로운 기능',
  content: 'React 19에는 많은 개선사항이 있습니다.',
  author: 'John Doe',
  category: 'development',
  status: 'published',
  views: 1234,
  createdAt: '2024-01-15',
  updatedAt: '2024-03-20',
}

export const Default: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      title: mockPost.title,
      content: mockPost.content,
      author: mockPost.author,
      category: mockPost.category,
    })
    return (
      <PostModalEdit
        isOpen={true}
        onClose={() => console.log('Close clicked')}
        formData={formData}
        setFormData={setFormData}
        selectedItem={mockPost}
        onSubmit={() => console.log('Submit:', formData)}
      />
    )
  },
}
