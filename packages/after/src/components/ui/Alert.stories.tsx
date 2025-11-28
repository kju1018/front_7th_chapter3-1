import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from './Alert'
import { InfoIcon, CheckCircle2Icon, AlertTriangleIcon, XCircleIcon } from 'lucide-react'

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="default">
        <InfoIcon />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>

      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>This is an informational alert message.</AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle2Icon />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your action was completed successfully.</AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangleIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Please be cautious about this action.</AlertDescription>
      </Alert>

      <Alert variant="error">
        <XCircleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>An error occurred while processing your request.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircleIcon />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>This action cannot be undone.</AlertDescription>
      </Alert>
    </div>
  ),
}
