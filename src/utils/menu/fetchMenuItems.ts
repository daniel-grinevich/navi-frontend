import { createServerFn } from '@tanstack/react-start'

export interface MenuItemType {
  category_name: string
  slug: string
  name: string
  status: string
  created_at: string | null
  updated_at: string | null
  created_by: number | null
  updated_by: number | null
  image: string
  body: string
  description: string
  price: number
  ingredients: any[]
}

export const fetchMenuItems = createServerFn({ method: 'GET' }).handler(
  async () => {
    const API_URL = import.meta.env.VITE_NAVI_API_URL!
    const menuItemsUrl = `${API_URL}/api/menu_items/`

    const response = await fetch(menuItemsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok)
      throw new Error(`Error fetching menu items: ${response.status}`)

    return (await response.json()) as [MenuItemType]
  }
)
