import { createServerFn } from '@tanstack/react-start'
import { drfAuth } from './drfAuthMiddleware'
import fakeMenuItems from '../menuitems.json'

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

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export const fetchMenudItems = createServerFn({ method: 'GET' })
  .middleware([drfAuth])
  .handler(async ({ context }) => {
    const url = `${API_URL}/api/menu_items/`

    console.log('Fetching menu items from', url, 'with token', context.token)

    const res = await fetch(url, {
      headers: {
        Authorization: `Token ${context.token}`,
        'Content-Type': 'application/json',
      },
    })

    const text = await res.text()
    if (!res.ok) {
      throw new Error(`fetchMenuItems failed: ${res.status} ${text}`)
    }

    return JSON.parse(text) as MenuItemType[]
  })

export const fetchFakeMenuItems = createServerFn({ method: 'GET' }).handler(
  async () => {
    return fakeMenuItems
  }
)
