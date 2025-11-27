// table/hooks/use-table-pagination.ts
import { useState, useMemo } from "react"

export function useTablePagination<T>(data: T[], pageSize: number) {
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, page, pageSize])

  return { paginatedData, page, totalPages, setPage }
}
