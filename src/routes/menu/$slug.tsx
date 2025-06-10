import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { OrderItemType } from '~/context/CartContext'
import { useCart } from '~/context/CartContext'
import CustomizationGroup from '~/components/CustomizationGroup'
import { ONE_DAY_MS, ONE_HOUR_MS } from '~/constants/api'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export interface OrderCustomizationType {
  customization: string
  quantity: number
  unit_price: number
}

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

export interface CustomizationGroupType {
  name: string
  category: number[]
  description: string
  display_order: number
  is_required: boolean
  allow_multiple: boolean
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
  status: string
  image: string
  body: string
  description: string
  price: number
  ingredients: any[]
  category: Category
}

export interface SelectedCustomizationType {
  group: string
  customization: string
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
    console.log(data)

    return data as MenuCustomizationsPayload
  })

function MenuItemDetail() {
  const navigate = useNavigate()
  const { slug } = Route.useParams()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['menuDetail', slug],
    queryFn: () => fetchMenuItem({ data: slug }),
    staleTime: ONE_DAY_MS,
    gcTime: ONE_HOUR_MS,
  })
  const [_, cartDispatch] = useCart()
  const [selectedCustomizations, setSelectedCustomizations] = React.useState<
    SelectedCustomizationType[] | []
  >([])

  if (isError) return <div>Error: {String(error)}</div>

  const handleSubmit = () => {
    if (data === undefined) {
      return null
    }
    const newItem: OrderItemType = {
      id: crypto.randomUUID(),
      menuItem: {
        name: data.name,
        slug: data.slug,
        status: data.status,
        description: data.description,
        image: data.image,
        body: data.body,
        price: data.price,
        ingredients: data.ingredients,
        category_name: null,
        created_at: null,
        updated_at: null,
        created_by: null,
        updated_by: null,
      },
      quantity: 1,
      customizations: selectedCustomizations.map((selectedCustomization) => {
        return { name: selectedCustomization.customization, quantity: 1 }
      }),
    }
    cartDispatch({ type: 'ADD_ITEM', payload: { item: newItem } })
    navigate({ to: '/menu' })
  }

  const handleSelect = (group: string, customization: string) => {
    if (group == undefined || customization == undefined) {
      return null
    }
    const existing = selectedCustomizations.find((selectedCustomization) => {
      selectedCustomization.group === group
    })
    if (!existing) {
      setSelectedCustomizations([
        ...selectedCustomizations,
        { group, customization },
      ])
    } else {
      setSelectedCustomizations(
        selectedCustomizations.map((selectedCustomization) =>
          selectedCustomization.group === group
            ? { group, customization }
            : selectedCustomization
        )
      )
    }
  }

  return (
    <div>
      <h1>
        {isLoading ? (
          <span className="h-8 w-48 bg-gray-200 animate-pulse inline-block" />
        ) : (
          'Customizations'
        )}
      </h1>

      <form onSubmit={handleSubmit}>
        {data?.category.customization_groups.map((group) => (
          <section key={group.slug}>
            <CustomizationGroup
              customizationGroup={isLoading ? null : group}
              onSelect={(selectedCustomization: string) =>
                handleSelect(group.slug, selectedCustomization)
              }
            />
          </section>
        ))}
        <button
          className="text-red-500"
          type="button"
          onClick={() => navigate({ to: '/menu' })}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add to Cart
        </button>
      </form>
    </div>
  )
}
