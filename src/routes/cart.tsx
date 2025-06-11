import React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import ShoppingCartItem from '~/components/CartItem'
import { useCart } from '~/context/CartContext'
import useCsrf from '~/hooks/useCsrf'
import { createServerFn } from '@tanstack/react-start'
import { drfLoginMiddleware } from '~/middleware/drfAuthMiddleware'
import { OrderPayload } from '~/utils/cart/createOrder'
import { useMutation } from '@tanstack/react-query'
import { useCreateOrder } from '~/hooks/useCreateOrder'

const API_URL = import.meta.env.VITE_NAVI_API_URL!

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const [cart, dispatch] = useCart()
  const { mutate, status, error } = useCreateOrder()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let { csrfToken } = await fetch(`${API_URL}/api/auth/csrf/`, {
      credentials: 'include',
    }).then((r) => r.json())

    const loginRes = await fetch(`${API_URL}/api/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        username: 'test@test.com',
        password: 'test',
      }),
    })
    if (!loginRes.ok) {
      throw new Error(`Login failed: ${loginRes.status}`)
    }

    ;({ csrfToken } = await loginRes.json())

    const orderRes = await fetch(`${API_URL}/api/orders/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        navi_port: 1,
        items: cart,
      }),
    })

    if (!orderRes.ok) {
      const text = await orderRes.text()
      throw new Error(`Order failed: ${orderRes.status} — ${text}`)
    }

    const json = await orderRes.json()
    console.log('Order success!', json)
  }

  if (status === 'error') return <p>Error: {(error as Error).message}</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      <form onSubmit={handleSubmit} method="POST">
        <ul className="divide-y divide-gray-200 mb-6">
          {cart.map((orderItem, index) => (
            <li key={index}>
              <ShoppingCartItem orderItem={orderItem} />
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="
            w-full
            bg-blue-600 hover:bg-blue-700 
            text-white font-semibold 
            rounded-lg py-3 
            shadow-md 
            transition 
            duration-200
          "
        >
          Place Your Order
        </button>
      </form>
    </div>
  )
}
