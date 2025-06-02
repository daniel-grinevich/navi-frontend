import React from 'react'
import Filter from './Filter'

interface FilterOption {
  name: string
  direction: 'none' | 'asc' | 'desc'
}

interface FilterOptionsProps {
  onFiltersChange: (allFilters: FilterOption[]) => void
}

export default function FilterOptions({ onFiltersChange }: FilterOptionsProps) {
  const [filters, setFilters] = React.useState<FilterOption[]>([])

  const filterNames = ['name', 'price']

  const handleClick = (next: 'none' | 'asc' | 'desc', fieldName: string) => {
    let updated: FilterOption[]

    if (next === 'none') {
      updated = filters.filter((f) => f.name !== fieldName)
    } else {
      const exists = filters.some((f) => f.name === fieldName)
      if (exists) {
        updated = filters.map((f) =>
          f.name === fieldName ? { name: fieldName, direction: next } : f
        )
      } else {
        updated = [...filters, { name: fieldName, direction: next }]
      }
    }

    setFilters(updated)
    onFiltersChange(updated)
  }

  return (
    <div>
      <h3 className="text-xl">Filters</h3>
      <div className="flex flex-row gap-3 border p-3 overflow-x-scroll">
        {filterNames.map((field) => {
          const entry = filters.find((f) => f.name === field)
          const isActive = entry !== undefined

          return (
            <Filter
              key={field}
              filter={field}
              isActive={isActive}
              onDirectionChange={(newDir) => handleClick(newDir, field)}
            />
          )
        })}
      </div>
    </div>
  )
}
