import {
  createFileRoute,
  useLoaderData,
  useNavigate,
} from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import MenuItem from '~/components/menu/MenuItem'
import React from 'react'
import Categories from '~/components/menu/Categories'
import FilterOptions from '~/components/FilterOptions'
import Search from '~/components/Search'
import useMenu from '~/hooks/useMenu'

interface FilterOption {
  name: string
  direction: 'none' | 'asc' | 'desc'
}

export const Route = createFileRoute('/menu/')({
  component: MenuPage,
})

function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState('')
  const [activeFilters, setActiveFilters] = React.useState<FilterOption[]>([])
  const [searchInput, setSearchInput] = React.useState('')
  const navigate = useNavigate()
  const { data: menuItems = [], isLoading, isError } = useMenu()

  const categories = React.useMemo(
    () =>
      Array.from(
        new Set(
          menuItems
            .map((m) => m.category_name)
            .filter((cat): cat is string => Boolean(cat))
        )
      ),
    [menuItems]
  )

  const handleCategoryClick = (category: string) => {
    if (category !== activeCategory) {
      setActiveCategory(category)
    }
  }

  const handleSearch = (input: string) => {
    setSearchInput(input)
  }

  const handleFilterChange = (filters: FilterOption[]) => {
    setActiveFilters(filters)
  }
  const handleMenuItemClick = (menuSlug: string | undefined) => {
    console.log('Made it', menuSlug)
    if (menuSlug === undefined) {
      return null
    }
    navigate({ to: '/menu/$slug', params: { slug: menuSlug } })
  }

  const seachedMenuItems = React.useMemo(() => {
    return menuItems
      .map((item) => {
        if (item.name.toLowerCase().includes(searchInput.toLowerCase())) {
          return item
        }

        return null
      })
      .filter(Boolean)
  }, [menuItems, searchInput])

  const categoryMenuItems = React.useMemo(() => {
    return seachedMenuItems.filter(
      (item) => item?.category_name != activeCategory
    )
  }, [seachedMenuItems, activeCategory])

  // TODO probably letting them sort on multiple filters is an anti pattern
  // Discuss if one active filter at a time is best
  const sortedMenuItems = React.useMemo(() => {
    if (!categoryMenuItems || activeFilters.length === 0) {
      return categoryMenuItems
    }

    return [...categoryMenuItems].sort((a, b) => {
      for (const { name: field, direction } of activeFilters) {
        if (direction === 'none') continue

        const aVal = (a as any)[field]
        const bVal = (b as any)[field]

        if (aVal === bVal) continue

        if (direction === 'asc') {
          return aVal > bVal ? 1 : -1
        } else if (direction === 'desc') {
          return aVal < bVal ? 1 : -1
        } else {
          throw new Error(
            'Invalid sort direction: expected "asc" | "desc" | "none".'
          )
        }
      }

      return 0
    })
  }, [categoryMenuItems, activeFilters])

  if (isLoading) return <div>Loading…</div>
  if (isError) return <div>Error loading menu</div>
  return (
    <div className="p-3">
      <Categories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <FilterOptions onFiltersChange={handleFilterChange} />
      <Search searchInput={searchInput} onInputChange={handleSearch} />
      <h1 className="text-3xl">Menu Items</h1>
      <div className="grid grid-cols-3 gap-3 my-3">
        {sortedMenuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            menuItem={menuItem}
            onMenuItemClick={() => handleMenuItemClick(menuItem?.slug)}
            imgSize={{ height: '150px', width: '150px' }}
          />
        ))}
      </div>
    </div>
  )
}
