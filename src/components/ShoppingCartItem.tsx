import React from 'react'
import { useCart } from '~/context/CartContext'
import { OrderItemType } from '~/context/CartContext'

interface ShoppingCartItemProps {
  orderItem: OrderItemType
}

export default function ShoppingCartItem({ orderItem }: ShoppingCartItemProps) {
  const [_, dispatch] = useCart()
  const menuItem = orderItem.menuItem

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const handleChangeQuantity = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE',
      payload: { id: id, updatedItem: { quantity: quantity } },
    })
  }

  return (
    <div>
      <h1>{menuItem.name}</h1>
      <button onClick={() => handleRemove(orderItem.id)}>Remove</button>{' '}
      <input
        type="number"
        min={1}
        value={orderItem.quantity}
        onChange={(e) =>
          handleChangeQuantity(orderItem.id, Number(e.target.value))
        }
      />
      <p>
        {orderItem.customizations.map((customization) => customization.name)}
      </p>
    </div>
  )
}
