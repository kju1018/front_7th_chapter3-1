import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table as UiTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../ui/table';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  header: string;
  width?: string;
  sortable?: boolean;
}

// 🚨 Bad Practice: UI 컴포넌트가 도메인 타입을 알고 있음
interface TableProps {
  columns?: Column[];
  data?: any[];
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  pageSize?: number;
  searchable?: boolean;
  sortable?: boolean;
  onRowClick?: (row: any) => void;

  // 🚨 도메인 관심사 추가
  entityType?: 'user' | 'post';
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  onPublish?: (id: number) => void;
  onArchive?: (id: number) => void;
  onRestore?: (id: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data = [],
  striped = false,
  bordered = false,
  hover = false,
  pageSize = 10,
  searchable = false,
  sortable = false,
  onRowClick,
  entityType,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onRestore,
}) => {
  const [tableData, setTableData] = useState<any[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnKey);
    setSortDirection(newDirection);

    const sorted = [...tableData].sort((a, b) => {
      const aVal = a[columnKey];
      const bVal = b[columnKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return newDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return newDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    setTableData(sorted);
  };

  const filteredData = searchable && searchTerm
    ? tableData.filter(row =>
        Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : tableData;

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const actualColumns = columns || (tableData[0] ? Object.keys(tableData[0]).map(key => ({ key, header: key, width: undefined })) : []);

  const formatLabel = (columnKey: string, value: any) => {
    if (columnKey === 'category') return value;

    if (columnKey === 'role') {
      if (value === 'admin') return '관리자';
      if (value === 'moderator') return '운영자';
      if (value === 'user') return '사용자';
      if (value === 'guest') return '게스트';
    }

    if (columnKey === 'status') {
      if (value === 'active') return '활성';
      if (value === 'inactive') return '비활성';
      if (value === 'suspended') return '정지';
      if (value === 'published') return '게시됨';
      if (value === 'draft') return '임시저장';
      if (value === 'archived') return '보관됨';
      if (value === 'pending') return '대기중';
      if (value === 'rejected') return '거부됨';
    }

    return value;
  };

  // 🚨 Bad Practice: Table 컴포넌트가 도메인별 렌더링 로직을 알고 있음
  const renderCell = (row: any, columnKey: string) => {
    const value = row[columnKey];

    // 도메인별 특수 렌더링
    if (entityType === 'user') {
      if (columnKey === 'role') {
        return <Badge tone="slate">{formatLabel(columnKey, value)}</Badge>;
      }
      if (columnKey === 'status') {
        // User status를 Badge status로 변환
        const statusTone =
          value === 'active'
            ? 'green'
            : value === 'inactive'
              ? 'amber'
              : 'rose';
        return <Badge tone={statusTone}>{formatLabel(columnKey, value)}</Badge>;
      }
      if (columnKey === 'lastLogin') {
        return value || '-';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    if (entityType === 'post') {
      if (columnKey === 'category') {
        const categoryTone =
          value === 'development'
            ? 'blue'
            : value === 'design'
              ? 'purple'
              : value === 'accessibility'
                ? 'emerald'
                : 'slate';
        return <Badge tone={categoryTone}>{value}</Badge>;
      }
      if (columnKey === 'status') {
        const statusTone =
          value === 'published'
            ? 'green'
            : value === 'draft'
              ? 'amber'
              : 'gray';
        return <Badge tone={statusTone}>{formatLabel(columnKey, value)}</Badge>;
      }
      if (columnKey === 'views') {
        return value?.toLocaleString() || '0';
      }
      if (columnKey === 'actions') {
        return (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="sm" variant="primary" onClick={() => onEdit?.(row)}>
              수정
            </Button>
            {row.status === 'draft' && (
              <Button
                size="sm"
                variant="success"
                onClick={() => onPublish?.(row.id)}
              >
                게시
              </Button>
            )}
            {row.status === 'published' && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onArchive?.(row.id)}
              >
                보관
              </Button>
            )}
            {row.status === 'archived' && (
              <Button
                size="sm"
                variant="primary"
                onClick={() => onRestore?.(row.id)}
              >
                복원
              </Button>
            )}
            <Button size="sm" variant="danger" onClick={() => onDelete?.(row.id)}>
              삭제
            </Button>
          </div>
        );
      }
    }

    // React Element면 그대로 렌더링
    if (React.isValidElement(value)) {
      return value;
    }

    return value;
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div>
          <Input
            type="text"
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      )}

      <UiTable>
        <TableHeader>
          <TableRow>
            {actualColumns.map((column) => (
              <TableHead
                key={column.key}
                style={column.width ? { width: column.width } : undefined}
                onClick={() => sortable && handleSort(column.key)}
                className={cn(sortable && 'cursor-pointer select-none')}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {sortable && sortColumn === column.key && (
                    <span className="text-xs text-muted-foreground">
                      {sortDirection === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={actualColumns.length || 1}
                className="py-6 text-center text-sm text-muted-foreground"
              >
                데이터가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  onRowClick && 'cursor-pointer',
                  hover && 'hover:bg-muted/50',
                  striped && rowIndex % 2 === 1 && 'bg-muted/30'
                )}
              >
                {actualColumns.map((column) => (
                  <TableCell key={column.key}>
                    {entityType ? renderCell(row, column.key) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </UiTable>

      {totalPages > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            variant="secondary"
            size="sm"
          >
            이전
          </Button>
          <span className="px-2 text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            variant="secondary"
            size="sm"
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
