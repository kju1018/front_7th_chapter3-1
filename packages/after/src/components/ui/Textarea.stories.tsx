import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'
import { Label } from './Label'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Type your message..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Textarea id="disabled" placeholder="Cannot edit" disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error">Error State</Label>
        <Textarea id="error" placeholder="Invalid input" aria-invalid="true" />
        <p className="text-sm text-destructive">This field is required</p>
      </div>
    </div>
  ),
}
