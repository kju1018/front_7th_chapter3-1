import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostModalCreate } from './PostModalCreate'
import { useState } from 'react'

const meta = {
  title: 'Pages/Post/PostModalCreate',
  component: PostModalCreate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '새 게시글을 생성하기 위한 폼 모달입니다.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PostModalCreate>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => {
    const [formData, setFormData] = useState({})
    return (
      <PostModalCreate
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
      title: 'React 19 새로운 기능 소개',
      author: 'John Doe',
      category: 'development',
      content: 'React 19에서는 많은 새로운 기능들이 추가되었습니다...',
    })
    return (
      <PostModalCreate
        isOpen={true}
        onClose={() => console.log('Close clicked')}
        formData={formData}
        setFormData={setFormData}
        onSubmit={() => console.log('Submit:', formData)}
      />
    )
  },
}
