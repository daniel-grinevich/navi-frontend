import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import MenuItem from '~/components/MenuItem'
import React from 'react'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export interface MenuItemType {
  slug: string
  name: string
  status: string
  created_at: string
  updated_at: string
  created_by: number
  updated_by: number
  image: string
  body: string
  description: string
  price: string
  ingredients: any[]
}

const fetchMenuItems = createServerFn({ method: 'GET' }).handler(async () => {
  const menuItemsUrl = `${API_URL}/api/menu_items/`

  const res = await fetch(menuItemsUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!res.ok) throw new Error('Error fetching menu items')

  const data = await res.json()

  return data as [MenuItemType]
})

export const Route = createFileRoute('/menu')({
  component: MenuPage,
  loader: async () => {
    const menuItems = await fetchMenuItems()
    return { menuItems }
  },
})

function MenuPage() {
  const { menuItems } = Route.useLoaderData()
  const [cart, setCart] = React.useState([])

  const effect = () => {
    console.log('effect')
  }

  return (
    <div className="p-3">
      <h1 className="text-3xl">Menu Items</h1>
      <div className="grid grid-cols-3 gap-3 my-3">
        {menuItems.map((menuItem) => (
          <MenuItem
            key={menuItem.slug}
            menuItem={menuItem}
            effect={effect}
            imgSize={{ height: '150px', width: '150px' }}
          />
        ))}
      </div>
    </div>
  )
}
