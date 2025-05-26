// src/components/menu/MenuItemsForm.tsx
import { useQuery } from '@tanstack/react-query'
import { fetchFakeMenuItems } from '~/utils/menuItems'
import React from 'react'

export default function MenuItemsForm() {
  const {
    data: menuItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['menuItems'],
    queryFn: fetchFakeMenuItems,
  })

  if (isLoading) {
    return <FormSkeleton />
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <p className="text-red-500">Failed to load menu. Please try again.</p>
      </div>
    )
  }

  return (
    <form
      method="post"
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.slug} className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="itemSlugs"
                value={item.slug}
                className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="font-medium text-gray-800">{item.name}</span>
            </label>
            <span className="text-gray-600">
              ${Number(item.price).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-shadow shadow-sm hover:shadow-md"
      >
        Finish Ordering
      </button>
    </form>
  )
}

// Skeleton loader component
function FormSkeleton() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse space-y-6">
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto" />

      <ul className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="h-4 bg-gray-200 rounded w-full" />
        ))}
      </ul>

      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  )
}
