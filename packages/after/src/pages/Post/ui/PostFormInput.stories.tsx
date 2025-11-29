import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostFormInput } from './PostFormInput'
import { useState } from 'react'

const meta = {
  title: 'Entities/Post/PostFormInput',
  component: PostFormInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PostFormInput은 게시글 관련 입력 필드를 위한 도메인 특화 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    fieldType: {
      control: 'select',
      options: ['postTitle', 'author', 'slug'],
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
} satisfies Meta<typeof PostFormInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [slug, setSlug] = useState('')
    return (
      <div className="space-y-4">
        <PostFormInput
          name="title"
          value={title}
          onChange={setTitle}
          label="Post Title"
          placeholder="Enter post title"
          fieldType="postTitle"
        />
        <PostFormInput
          name="author"
          value={author}
          onChange={setAuthor}
          label="Author"
          placeholder="Your name"
          fieldType="author"
        />
        <PostFormInput
          name="slug"
          value={slug}
          onChange={setSlug}
          label="URL Slug"
          placeholder="my-post-slug"
          fieldType="slug"
        />
      </div>
    )
  },
}

export const WithBusinessRules: Story = {
  render: () => {
    const [title, setTitle] = useState('')
    return (
      <div className="space-y-4">
        <PostFormInput
          name="title"
          value={title}
          onChange={setTitle}
          label="Post Title"
          placeholder="Try '광고' or '스팸'"
          fieldType="postTitle"
          checkBusinessRules={true}
        />
        <div className="text-xs text-muted-foreground">금지어: 광고, 스팸, 홍보</div>
      </div>
    )
  },
}

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <PostFormInput
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
  args: {
    name: 'title',
    label: 'Post Title',
    placeholder: 'Enter post title',
    fieldType: 'postTitle',
    checkBusinessRules: false,
  },
}
