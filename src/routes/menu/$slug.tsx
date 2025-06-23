import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { OrderItemType } from '~/context/CartContext'
import { useCart } from '~/hooks/useCart'
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
  validateSearch: (search: Record<string, unknown>) => {
    return {
      orderItemId:
        typeof search.orderItemId === 'string' ? search.orderItemId : undefined,
    }
  },
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
  const { orderItemId }: { orderItemId?: string } = Route.useSearch()
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['menuDetail', slug],
    queryFn: () => fetchMenuItem({ data: slug }),
    staleTime: ONE_DAY_MS,
    gcTime: ONE_HOUR_MS,
  })
  const [cart, cartDispatch] = useCart()
  const [selectedCustomizations, setSelectedCustomizations] = React.useState<
    SelectedCustomizationType[] | []
  >([])

  //Setting customizations if we are editing a cart item
  React.useEffect(() => {
    if (!orderItemId || !data) return
    const orderItem = cart.find(
      (item) => String(item.id) === String(orderItemId)
    )
    if (!orderItem) return

    const updatedSelections = orderItem.customizations.map((customization) => {
      const matchedGroup = data.category.customization_groups.find((group) =>
        group.customizations.some(
          (customizationInGroup) =>
            customization.name === customizationInGroup.name
        )
      )

      return {
        group: matchedGroup?.slug ?? '',
        customization: customization.name,
      }
    })
    console.log(updatedSelections)

    setSelectedCustomizations(updatedSelections)
  }, [orderItemId, cart, data])

  if (isError) return <div>Error: {String(error)}</div>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data === undefined) {
      return null
    }

    if (orderItemId) {
      //update item if we are editing
      const customizations = selectedCustomizations.map(
        (selectedCustomization) => {
          return {
            name: selectedCustomization.customization,
            quantity: 1,
          }
        }
      )
      cartDispatch({
        type: 'UPDATE',
        payload: {
          id: orderItemId,
          updatedItem: {
            customizations: customizations,
          },
        },
      })
      navigate({ to: '/cart' })
    } else {
      //Create new item if we are adding a net new item to the cart
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
          category_name: '',
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
      cartDispatch({ type: 'ADD_ITEM', payload: { item: newItem } }) //add in replacing item
      navigate({ to: '/menu' })
    }
  }

  const handleSelect = (groupSlug: string, customization: string) => {
    if (
      groupSlug == undefined ||
      customization == undefined ||
      data == undefined
    ) {
      return null
    }
    const group = data.category.customization_groups.find(
      (g) => g.slug === groupSlug
    )

    if (!group) return
    const isMulti = group.allow_multiple

    setSelectedCustomizations((prev) => {
      const alreadySelected = prev.some(
        (c) => c.group === groupSlug && c.customization === customization
      )

      if (alreadySelected) {
        // Toggle off (remove selection)
        return prev.filter(
          (c) => !(c.group === groupSlug && c.customization === customization)
        )
      }

      if (!isMulti) {
        // Single select: replace all for this group
        return [
          ...prev.filter((c) => c.group !== groupSlug),
          { group: groupSlug, customization },
        ]
      }

      // Multi-select: add to existing
      return [...prev, { group: groupSlug, customization }]
    })
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

      <form onSubmit={(e) => handleSubmit(e)}>
        {data?.category.customization_groups.map((group) => (
          <section key={group.slug}>
            <CustomizationGroup
              customizationGroup={isLoading ? null : group}
              onSelect={(selectedCustomization: string) =>
                handleSelect(group.slug, selectedCustomization)
              }
              selectedCustomizations={selectedCustomizations
                .filter((c) => c.group === group.slug)
                .map((c) => c.customization)}
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
