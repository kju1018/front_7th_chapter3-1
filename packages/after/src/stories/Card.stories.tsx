import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    tone: {
      control: 'select',
      options: ['default', 'blue', 'green', 'amber', 'rose', 'gray'],
    },
  },
  args: {
    tone: 'default',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

const CardExample = (args: Story['args']) => (
  <Card {...args}>
    <CardHeader className="border-b pb-4">
      <CardTitle>카드 제목</CardTitle>
      <CardDescription>카드에 대한 간단한 설명을 넣을 수 있습니다.</CardDescription>
      <CardAction>
        <Badge variant="outline">상태</Badge>
      </CardAction>
    </CardHeader>

    <CardContent className="space-y-3">
      <p>본문에는 상세 내용, 통계, 설명 등을 자유롭게 배치할 수 있습니다.</p>
      <p className="text-muted-foreground">
        필요하다면 리스트, 버튼, 배지 등을 조합해 섹션을 구성하세요.
      </p>
    </CardContent>
  </Card>
);

export const Default: Story = {
  render: (args) => <CardExample {...args} />,
};

export const Blue: Story = {
  args: { tone: 'blue' },
  render: (args) => <CardExample {...args} />,
};

export const Green: Story = {
  args: { tone: 'green' },
  render: (args) => <CardExample {...args} />,
};

export const Amber: Story = {
  args: { tone: 'amber' },
  render: (args) => <CardExample {...args} />,
};

export const Rose: Story = {
  args: { tone: 'rose' },
  render: (args) => <CardExample {...args} />,
};

export const Gray: Story = {
  args: { tone: 'gray' },
  render: (args) => <CardExample {...args} />,
};
