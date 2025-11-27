// table/hooks/use-table-filter.ts
import { useState, useMemo } from "react"

export function useTableFilter<T extends Record<string, any>>(data: T[], enabled: boolean) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = useMemo(() => {
    if (!enabled || !searchTerm) return data

    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm, enabled])

  return { searchTerm, filteredData, setSearchTerm }
}
