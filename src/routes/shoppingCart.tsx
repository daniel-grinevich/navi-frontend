import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ShoppingCart from '~/components/ShoppingCart'

interface CustomizationsCartItem {
  name: string
  unitPrice: number
  quantity: number
}

interface MenuCartItem {
  name: string
  unitPrice: number
  quantity: number
  customizations?: CustomizationsCartItem[] | null
}

export const Route = createFileRoute('/shoppingCart')({
  component: ShoppingCartPage,
})

const cartItems: MenuCartItem[] = [
  {
    name: 'Black Coffee',
    unitPrice: 2.99,
    quantity: 2,
    customizations: null,
  },
  {
    name: 'Latte',
    unitPrice: 4.25,
    quantity: 1,
    customizations: [
      {
        name: 'Size',
        unitPrice: 1.25,
        quantity: 0,
      },
    ],
  },
]

function ShoppingCartPage() {
  const [cart, setCart] = React.useState(cartItems)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Shopping Cart</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <li>
          {cart.map((item, index) => (
            <ul key={index}>{item.name}</ul>
          ))}
        </li>
      </form>
    </div>
  )
}
