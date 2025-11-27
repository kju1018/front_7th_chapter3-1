// table/hooks/use-table-sort.ts
import { useState, useMemo } from "react"

export function useTableSort<T extends Record<string, any>>(data: T[], enabled: boolean) {
  const [sortState, setSortState] = useState({
    column: "",
    direction: "asc" as "asc" | "desc",
  })

  const onSort = (columnKey: string) => {
    if (!enabled) return

    setSortState((prev) => ({
      column: columnKey,
      direction: prev.column === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }))
  }

  const sortedData = useMemo(() => {
    if (!enabled || !sortState.column) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortState.column]
      const bVal = b[sortState.column]

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortState.direction === "asc" ? aVal - bVal : bVal - aVal
      }

      return sortState.direction === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [data, enabled, sortState])

  return { sortedData, sortState, onSort }
}
