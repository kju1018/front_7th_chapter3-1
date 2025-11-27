// table/columns/user-columns.tsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Column } from "../types"

export interface UserRow {
  id: number
  name: string
  role: string
  status: string
  lastLogin?: string
  onEdit?: (row: UserRow) => void
  onDelete?: (id: number) => void
}

// 레거시 Table.tsx의 formatLabel 로직 그대로 가져오기
const formatLabel = (columnKey: string, value: string) => {
  if (columnKey === "role") {
    if (value === "admin") return "관리자"
    if (value === "moderator") return "운영자"
    if (value === "user") return "사용자"
    if (value === "guest") return "게스트"
  }

  if (columnKey === "status") {
    if (value === "active") return "활성"
    if (value === "inactive") return "비활성"
    if (value === "suspended") return "정지"
    if (value === "published") return "게시됨"
    if (value === "draft") return "임시저장"
    if (value === "archived") return "보관됨"
    if (value === "pending") return "대기중"
    if (value === "rejected") return "거부됨"
  }

  return value
}

export const userColumns: Column<UserRow>[] = [
  { key: "name", header: "이름", sortable: true },

  {
    key: "role",
    header: "권한",
    sortable: true,
    render: (row) => (
      <Badge tone="slate">{formatLabel("role", row.role)}</Badge>
    ),
  },

  {
    key: "status",
    header: "상태",
    sortable: true,
    render: (row) => {
      const tone =
        row.status === "active"
          ? "green"
          : row.status === "inactive"
            ? "amber"
            : "rose"

      return (
        <Badge tone={tone}>
          {formatLabel("status", row.status)}
        </Badge>
      )
    },
  },

  {
    key: "lastLogin",
    header: "마지막 로그인",
    sortable: false,
    render: (row) => row.lastLogin || "-",
  },

  {
    key: "actions",
    header: "액션",
    render: (row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="primary" onClick={() => row.onEdit?.(row)}>
          수정
        </Button>
        <Button size="sm" variant="danger" onClick={() => row.onDelete?.(row.id)}>
          삭제
        </Button>
      </div>
    ),
  },
]
