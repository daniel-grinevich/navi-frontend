import { createServerFn } from '@tanstack/react-start'
import { drfAuth }         from './drfAuthMiddleware'

export interface MenuItemType {
  slug: string;
  name: string;
  status: string;
  created_at: string;    // ISO timestamp
  updated_at: string;    // ISO timestamp
  created_by: number;
  updated_by: number;
  image: string;         // URL to image
  body: string;
  description: string;
  price: string;         // e.g. "34.00"
  ingredients: any[];    // adjust to a more specific type if you know the shape
}

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export const fetchMenuItems = createServerFn({ method: 'GET' })
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