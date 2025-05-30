import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import MenuItemsForm from '~/components/menu/MenuItemsForm'

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

  return (
    <div>
      <h1>Menu Items</h1>
      {menuItems.map((item) => (
        <p key={item.slug}>{item.name}</p>
      ))}
    </div>
  )
}
