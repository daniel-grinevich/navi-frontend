import { createServerFn } from '@tanstack/react-start'
import { CustomizationGroupType } from '~/routes/menu/$slug'
import { API_URL } from '~/constants/api'


interface Category {
  id: number
  name: string
  slug: string
  customization_groups: CustomizationGroupType[]
}

interface MenuCustomizationsPayload {
    name: string
    slug: string
    status: string
    image: string
    body: string
    description: string
    price: number
    ingredients: any[]
    category: Category
  }

export const fetchMenuItem = createServerFn({ method: 'GET' })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const menuItemsUrl = `${API_URL}/api/menu_items/${ctx.data}/category-customizations/`

    const res = await fetch(menuItemsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) throw new Error('Error fetching menu item')

    const data = await res.json()
    console.log(data)

    return data as MenuCustomizationsPayload
  })