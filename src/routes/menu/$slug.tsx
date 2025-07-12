import React from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { OrderItemType } from '~/context/CartContext'
import { useCart } from '~/hooks/useCart'
import CustomizationGroup from '~/components/CustomizationGroup'
import useMenuCustomizations from '~/hooks/useMenuCustomizations'

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

function MenuItemDetail() {
  const navigate = useNavigate()
  const { slug } = Route.useParams()
  const { orderItemId }: { orderItemId?: string } = Route.useSearch()
  const { data } = useMenuCustomizations(slug)
  const [cart, cartDispatch] = useCart()
  const [selectedCustomizations, setSelectedCustomizations] = React.useState<
    SelectedCustomizationType[] | []
  >([])

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

    setSelectedCustomizations(updatedSelections)
  }, [orderItemId, cart, data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (data === undefined) {
      return null
    }

    if (orderItemId) {
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
      navigate({ to: '/checkout/cart' })
    } else {
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
      cartDispatch({ type: 'ADD_ITEM', payload: { item: newItem } })
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
        return prev.filter(
          (c) => !(c.group === groupSlug && c.customization === customization)
        )
      }

      if (!isMulti) {
        return [
          ...prev.filter((c) => c.group !== groupSlug),
          { group: groupSlug, customization },
        ]
      }

      return [...prev, { group: groupSlug, customization }]
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          Customize Your {data?.category.name}
        </h2>

        <div className="space-y-4">
          {data?.category.customization_groups.map((group) => (
            <section key={group.slug} className="p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
              <CustomizationGroup
                customizationGroup={group}
                onSelect={(selected) => handleSelect(group.slug, selected)}
                selectedCustomizations={selectedCustomizations
                  .filter((c) => c.group === group.slug)
                  .map((c) => c.customization)}
              />
            </section>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate({ to: '/menu' })}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg font-semibold bg-green-500"
          >
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  )
}
