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

//Maps old customizations to UI if editing an existing order item
function mapOrderItemToSelections(
  orderItem: OrderItemType,
  groups: CustomizationGroupType[]
): SelectedCustomizationType[] {
  return orderItem.customizations.map(({ name }) => {
    const matchedGroup = groups.find((group) =>
      group.customizations.some((c) => c.name === name)
    )
    return { group: matchedGroup?.slug ?? '', customization: name }
  })
}

function toggleCustomization(
  prev: SelectedCustomizationType[],
  group: CustomizationGroupType,
  customization: string
): SelectedCustomizationType[] {
  const { slug, allow_multiple } = group
  const alreadySelected = prev.some(
    (c) => c.group === slug && c.customization === customization
  )

  if (alreadySelected) {
    // Deselect
    return prev.filter(
      (c) => !(c.group === slug && c.customization === customization)
    )
  }

  if (!allow_multiple) {
    // Replace group
    return [
      ...prev.filter((c) => c.group !== slug),
      { group: slug, customization },
    ]
  }

  // Add new selection
  return [...prev, { group: slug, customization }]
}

function MenuItemDetail() {
  const navigate = useNavigate()
  const { slug } = Route.useParams()
  const { orderItemId }: { orderItemId?: string } = Route.useSearch()
  const { data } = useMenuCustomizations(slug)
  const customizationGroups = React.useMemo(
    () => data?.category.customization_groups ?? [],
    [data]
  )
  const [cart, cartDispatch] = useCart()
  const [selectedCustomizations, setSelectedCustomizations] = React.useState<
    SelectedCustomizationType[]
  >([])

  const createOrderItem = () => {
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

  const updateOrderItem = (orderItemId: string) => {
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (orderItemId) {
      updateOrderItem(orderItemId)
    } else {
      createOrderItem()
    }
  }

  const handleSelect = (
    group: CustomizationGroupType,
    customization: string
  ) => {
    setSelectedCustomizations((prev) =>
      toggleCustomization(prev, group, customization)
    )
  }

  React.useEffect(() => {
    if (!orderItemId || !data) return
    const orderItem = cart.find(
      (item) => String(item.id) === String(orderItemId)
    )
    if (!orderItem) return

    setSelectedCustomizations(
      mapOrderItemToSelections(orderItem, customizationGroups)
    )
  }, [orderItemId, cart, data])

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
          {customizationGroups.map((group) => (
            <section key={group.slug} className="p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
              <CustomizationGroup
                customizationGroup={group}
                onSelect={(selected) => handleSelect(group, selected)}
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
            {orderItemId ? 'Update Item' : 'Add to Cart'}
          </button>
        </div>
      </form>
    </div>
  )
}
