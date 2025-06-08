import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export interface CustomizationType {
  name: string
  group: number
  description: string
  display_order: number
  price: number
  created_at: Date
  created_by: number
  updated_at: Date
  updated_by: number
  slug: string
}

interface CustomizationGroupType {
  name: string
  category: number[]
  description: string
  display_order: number
  is_required: boolean
  created_at: Date
  created_by: number
  updated_at: Date
  updated_by: number
  slug: string
  customizations: CustomizationType[]
}

interface Category {
  id: number
  name: string
  slug: string
  customization_groups: CustomizationGroupType[]
}

interface MenuCustomizationsPayload {
  name: string
  slug: string
  category: Category
}

export const Route = createFileRoute('/menu/$slug')({
  component: MenuItemDetail,
})

const fetchMenuItem = createServerFn({ method: 'GET' })
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const menuItemsUrl = `${API_URL}/api/menu_items/${ctx.data}/category-customizations/`

    const res = await fetch(menuItemsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) throw new Error('Error fetching menu item')

    const data = await res.json()

    return data as MenuCustomizationsPayload
  })

function MenuItemDetail() {
  const { slug } = Route.useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['menuDetail', slug],
    queryFn: () => fetchMenuItem({ data: slug }),
  })

  if (isLoading) return <div>Loading menu…</div>
  if (isError) return <div>Error: {String(error)}</div>
  if (!data) return <div>No menu found.</div>

  return (
    <div>
      <h1>{data.name}</h1>
      {data.category.customization_groups.map((group) => (
        <section key={group.slug}>
          <h2>{group.name}</h2>
          {group.customizations.map((c) => (
            <div key={c.slug}>
              {c.name} — ${c.price}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
