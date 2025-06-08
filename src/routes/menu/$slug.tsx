import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import MenuItem from '~/components/MenuItem'
import { createServerFn } from '@tanstack/react-start'
import { MenuItemType } from '.'
import { mockCustomizationGroups, mockCustomizations } from '~/staticData'
import MenuItemCustomizations from '~/components/MenuItemCustomizations'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export interface CustomizationType {
  name: string
  group: CustomizationGroupType
  description: string
  display_order: number
  price: number
}

export interface CustomizationGroupType {
  name: string
  category: string
  description: string
  display_order: number
  is_required: boolean
}

export const Route = createFileRoute('/menu/$slug')({
  component: MenuItemDetail,
})

const fetchMenuItem = createServerFn({ method: 'GET' })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const menuItemsUrl = `${API_URL}/api/menu_items/${ctx.data}`

    const res = await fetch(menuItemsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) throw new Error('Error fetching menu item')

    const data = await res.json()

    return data as MenuItemType
  })

function MenuItemDetail() {
  const { slug } = Route.useParams()
  const { data } = useSuspenseQuery({
    queryKey: ['menuDetail', slug],
    queryFn: () => fetchMenuItem({ data: slug }),
  })
  return (
    <div>
      {data.name}
      <MenuItemCustomizations
        menuItem={data}
        customizationGroups={mockCustomizationGroups}
        customizations={mockCustomizations}
      />
    </div>
  )
}
