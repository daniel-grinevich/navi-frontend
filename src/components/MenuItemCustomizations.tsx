import React from 'react'
import { useCart } from '~/context/CartContext'
import { OrderItemType } from '~/context/CartContext'
import { MenuItemType } from '~/routes/menu'
import { CustomizationGroupType, CustomizationType } from '~/routes/menu/$slug'

interface MenuItemCustomizationsProps {
  menuItem: MenuItemType | null
  customizationGroups: CustomizationGroupType[]
  customizations: CustomizationType[]
}

export default function MenuItemCustomizations({
  menuItem,
  customizationGroups,
  customizations,
}: MenuItemCustomizationsProps) {
  const [_, cartDispatch] = useCart()

  if (menuItem === null) {
    return null
  }

  const handleSubmit = () => {
    const newItem: OrderItemType = {
      id: crypto.randomUUID(),
      menuItem: menuItem, // your MenuItemType
      quantity: 1,
      customizations: [],
    }
    cartDispatch({ type: 'ADD_ITEM', payload: { item: newItem } })
  }

  const handleCancel = () => {}

  return (
    <div>
      <h1>Menu Item: {menuItem.name}</h1>
      <button className="text-red-500" onClick={handleCancel}>
        Cancel
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Add to Cart
      </button>
    </div>
  )
}
