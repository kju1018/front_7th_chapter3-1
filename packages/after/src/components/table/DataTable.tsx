// table/DataTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useTableSort } from "./hooks/use-table-sort"
import { useTableFilter } from "./hooks/use-table-filter"
import { useTablePagination } from "./hooks/use-table-pagination"

import type { Column, DataTableProps, RowData } from "./types"

interface DataTableActionProps<T extends RowData> {
  onEdit?: (item: T) => void
  onDelete?: (id: number) => void
  onPublish?: (id: number) => void
  onArchive?: (id: number) => void
  onRestore?: (id: number) => void
}

export function DataTable<T extends RowData>({
  data,
  columns,
  searchable = false,
  sortable = false,
  pageSize = 10,
  actions = {},
}: DataTableProps<T> & { actions?: DataTableActionProps<T> }) {
  const { searchTerm, filteredData, setSearchTerm } = useTableFilter<T>(data, searchable)
  const { sortedData, sortState, onSort } = useTableSort<T>(filteredData, sortable)
  const { paginatedData, page, totalPages, setPage } = useTablePagination<T>(sortedData, pageSize)

  // 🔥 row에 actions 자동 주입
  const rowsWithActions = paginatedData.map((row) => ({
    ...row,
    ...actions,
  }))

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 🔍 검색 */}
      {searchable && (
        <input
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-md w-60"
        />
      )}

      {/* 테이블 */}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                onClick={() => col.sortable && onSort(col.key)}
                className={col.sortable ? "cursor-pointer select-none" : ""}
              >
                <div className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortState.column === col.key && (
                    <span>{sortState.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rowsWithActions.map((row, index) => (
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 페이징 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="border rounded-md px-3 py-1 disabled:opacity-50"
          >
            이전
          </button>

          <span>
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="border rounded-md px-3 py-1 disabled:opacity-50"
          >
            다음
          </button>
        </div>
      )}
    </div>
  )
}
