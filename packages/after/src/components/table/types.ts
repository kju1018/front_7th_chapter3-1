// table/types.ts
export type RowData = Record<string, any>

export interface Column<T extends RowData> {
  key: string
  header: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends RowData> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  sortable?: boolean
  pageSize?: number
  actions?: Record<string, any>
}
