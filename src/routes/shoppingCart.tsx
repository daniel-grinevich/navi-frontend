import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ShoppingCartItem from '~/components/ShoppingCartItem'
import { useCart } from '~/context/CartContext'

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

function ShoppingCartPage() {
  const [cart, dispatch] = useCart()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Shopping Cart</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <li>
          {cart.map((orderItem, index) => (
            <ShoppingCartItem orderItem={orderItem} />
          ))}
        </li>
      </form>
    </div>
  )
}
