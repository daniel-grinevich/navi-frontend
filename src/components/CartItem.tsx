import React from 'react'
import { useCart } from '~/context/CartContext'
import { OrderItemType } from '~/context/CartContext'

interface ShoppingCartItemProps {
  orderItem: OrderItemType
}

export default function CartItem({ orderItem }: ShoppingCartItemProps) {
  const [_, dispatch] = useCart()

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const handleIncrement = (item: OrderItemType) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        id: item.id,
        updatedItem: { quantity: item.quantity + 1 },
      },
    })
  }

  const handleDecrement = (item: OrderItemType) => {
    if (item.quantity > 1) {
      dispatch({
        type: 'UPDATE',
        payload: {
          id: item.id,
          updatedItem: { quantity: item.quantity - 1 },
        },
      })
    }
  }

  return (
    <div className="flex justify-between items-start p-4 border-b">
      <div>
        <h2 className="text-xl font-semibold">{orderItem.menuItem.name}</h2>
        <ul className="flex flex-wrap gap-2 mt-2">
          {orderItem.customizations.map((c) => (
            <li key={c.name}>
              <span className="text-sm border rounded-full px-2 py-1">
                {c.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-end gap-2 min-w-24">
        <span className="font-medium">Quantity: {orderItem.quantity}</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => handleIncrement(orderItem)}
            className="border rounded px-2"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => handleDecrement(orderItem)}
            className="border rounded px-2"
          >
            –
          </button>
        </div>
        <button
          type="button"
          onClick={() => handleRemove(orderItem.id)}
          className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
