import React from 'react';
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './Table';
import { cn } from '@/lib/utils';

export interface Column {
  key: string;
  header: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  striped?: boolean;
  hover?: boolean;
  renderCell: (row: T, columnKey: string) => React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  striped = false,
  hover = true,
  renderCell,
}: DataTableProps<T>) {
  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              style={{ width: column.width }}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className={cn(
              striped && rowIndex % 2 === 0 && 'bg-muted/50',
              hover && 'hover:bg-muted/70'
            )}
          >
            {columns.map((column) => (
              <TableCell key={column.key}>
                {renderCell(row, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  );
}

// Export Column type for backward compatibility
export type { Column as TableColumn };
