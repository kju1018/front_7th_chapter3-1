// table/columns/post-columns.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "../types"

export interface PostRow {
  id: number
  title: string
  category: string
  status: string
  views: number
  onEdit?: (row: PostRow) => void
  onDelete?: (id: number) => void
  onPublish?: (id: number) => void
  onArchive?: (id: number) => void
  onRestore?: (id: number) => void
}

const formatLabel = (columnKey: string, value: string) => {
  if (columnKey === "status") {
    if (value === "published") return "게시됨"
    if (value === "draft") return "임시저장"
    if (value === "archived") return "보관됨"
    if (value === "pending") return "대기중"
    if (value === "rejected") return "거부됨"
  }

  return value
}

// ⭐ Column<PostRow>[] → ColumnDef[]
export const postColumns: ColumnDef[] = [
  { key: "title", header: "제목", sortable: true },

  {
    key: "category",
    header: "카테고리",
    sortable: true,
    render: (row) => {
      const tone =
        row.category === "development"
          ? "blue"
          : row.category === "design"
          ? "purple"
          : row.category === "accessibility"
          ? "emerald"
          : "slate"

      return <Badge tone={tone}>{row.category}</Badge>
    },
  },

  {
    key: "status",
    header: "상태",
    sortable: true,
    render: (row) => {
      const tone =
        row.status === "published"
          ? "green"
          : row.status === "draft"
          ? "amber"
          : "gray"

      return (
        <Badge tone={tone}>
          {formatLabel("status", row.status)}
        </Badge>
      )
    },
  },

  {
    key: "views",
    header: "조회수",
    sortable: true,
    render: (row) => row.views?.toLocaleString() ?? "0",
  },

  {
    key: "actions",
    header: "액션",
    render: (row) => (
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="primary" onClick={() => row.onEdit?.(row)}>
          수정
        </Button>

        {row.status === "draft" && (
          <Button
            size="sm"
            variant="success"
            onClick={() => row.onPublish?.(row.id)}
          >
            게시
          </Button>
        )}

        {row.status === "published" && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => row.onArchive?.(row.id)}
          >
            보관
          </Button>
        )}

        {row.status === "archived" && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => row.onRestore?.(row.id)}
          >
            복원
          </Button>
        )}

        <Button
          size="sm"
          variant="danger"
          onClick={() => row.onDelete?.(row.id)}
        >
          삭제
        </Button>
      </div>
    ),
  },
]
