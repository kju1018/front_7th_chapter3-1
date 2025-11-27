// table/types.ts

export interface ColumnDef {
  key: string
  header: string
  sortable?: boolean
  render?: (row: any) => React.ReactNode
}

export interface DataTableProps {
  data: any[]
  columns: ColumnDef[]
  searchable?: boolean
  sortable?: boolean
  pageSize?: number
  actions?: {
    onEdit?: (item: any) => void
    onDelete?: (id: number) => void
    onPublish?: (id: number) => void
    onArchive?: (id: number) => void
    onRestore?: (id: number) => void
  }
}
