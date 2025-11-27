// table/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useTableSort } from './hooks/use-table-sort';
import { useTableFilter } from './hooks/use-table-filter';
import { useTablePagination } from './hooks/use-table-pagination';
import type { ColumnDef, DataTableProps } from './types';

export function DataTable({
  data,
  columns,
  searchable = false,
  sortable = false,
  pageSize = 10,
  actions = {},
}: DataTableProps) {
  const { searchTerm, filteredData, setSearchTerm } = useTableFilter(data, searchable);
  const { sortedData, sortState, onSort } = useTableSort(filteredData, sortable);
  const { paginatedData, page, totalPages, setPage } = useTablePagination(sortedData, pageSize);

  // 🔥 actions 자동 주입
  const rows = paginatedData.map((row) => ({ ...row, ...actions }));

  return (
    <div className="w-full flex flex-col gap-4">
      {searchable && (
        <input
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md w-60"
        />
      )}

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={() => col.sortable && onSort(col.key)}
                className={col.sortable ? 'cursor-pointer select-none' : ''}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortState.column === col.key && (
                    <span>{sortState.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.render ? col.render(row) : row[col.key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-2">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            이전
          </button>
          <span>
            {page} / {totalPages}
          </span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            다음
          </button>
        </div>
      )}
    </div>
  );
}
