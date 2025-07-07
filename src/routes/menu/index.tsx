import { createFileRoute, useNavigate } from '@tanstack/react-router'
import MenuItem from '~/components/menu/MenuItem'
import React from 'react'
import Categories from '~/components/menu/Categories'
import useMenu from '~/hooks/useMenu'

export const Route = createFileRoute('/menu/')({
  component: MenuPage,
})

function MenuPage() {
  const [activeCategory, setActiveCategory] = React.useState('')
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

  const handleMenuItemClick = (menuSlug: string) => {
    navigate({
      to: '/menu/$slug',
      params: { slug: menuSlug },
      search: { orderItemId: undefined },
    })
  }

  const categoryMenuItems = React.useMemo(() => {
    return menuItems.filter((item) => item?.category_name != activeCategory)
  }, [menuItems, activeCategory])

  if (isLoading) return <div>Loading…</div>
  if (isError) return <div>Error loading menu</div>
  return (
    <div className="relative p-3 flex flex-col md:flex-col lg:flex-row gap-6">
      <aside className="lg:w-1/6 lg:sticky lg:top-0">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      </aside>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">
          {activeCategory !== '' ? activeCategory : 'All Items'}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {categoryMenuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              menuItem={menuItem}
              onMenuItemClick={() => handleMenuItemClick(menuItem.slug)}
              imgSize={{ height: '150px', width: '150px' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
