import React from 'react'
import { useCart } from '~/context/CartContext'

export default function ShoppingCart() {
  const [cart, dispatch] = useCart()

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
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.menuItem.name} – Qty: {item.quantity}{' '}
            <button onClick={() => handleRemove(item.id)}>Remove</button>{' '}
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) =>
                handleChangeQuantity(item.id, Number(e.target.value))
              }
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
