import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataTable } from '@/components/table/DataTable';
import type { ColumnDef } from '@/components/table/types';

const sampleData = [
  { id: 1, name: 'Alice', role: 'Designer', status: 'Active', projects: 4 },
  { id: 2, name: 'Bob', role: 'Developer', status: 'Active', projects: 7 },
  { id: 3, name: 'Carol', role: 'Product Manager', status: 'On Leave', projects: 2 },
  { id: 4, name: 'Dave', role: 'QA', status: 'Active', projects: 5 },
  { id: 5, name: 'Eve', role: 'Developer', status: 'Inactive', projects: 1 },
  { id: 6, name: 'Frank', role: 'Designer', status: 'Active', projects: 3 },
  { id: 7, name: 'Grace', role: 'Developer', status: 'Active', projects: 6 },
];

const columns: ColumnDef[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
  { key: 'projects', header: 'Projects', sortable: true },
] ;

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    searchable: { control: 'boolean' },
    sortable: { control: 'boolean' },
    pageSize: { control: { type: 'number', min: 1, max: 20 } },
  },
  args: {
    data: sampleData,
    columns,
    searchable: true,
    sortable: true,
    pageSize: 5,
    actions: {
      onEdit: (row) => console.log('edit', row),
      onDelete: (id) => console.log('delete', id),
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SearchOnly: Story = {
  args: {
    sortable: false,
  },
};

export const SortOnly: Story = {
  args: {
    searchable: false,
  },
};