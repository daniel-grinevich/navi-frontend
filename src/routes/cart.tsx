import React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useCart } from '~/hooks/useCart'
import CartItem from '~/components/CartItem'
import { useAuth } from '~/hooks/useAuth'
import { API_URL } from '~/constants/api'
import { QRCodeSVG } from 'qrcode.react'

interface OrderCustomizationPayload {
  customization: string
  quantity: number
}

interface OrderItemPayload {
  menu_item: string
  quantity: number
  unit_price: string
  customizations?: OrderCustomizationPayload[]
}

interface OrderPayload {
  navi_port: number
  items: OrderItemPayload[]
}

export const Route = createFileRoute('/cart')({
  component: CartPage,
})

function CartPage() {
  const { authToken } = useAuth()
  const [cart, cartDispatch] = useCart()
  const [orderId, setOrderId] = React.useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: OrderPayload = {
      navi_port: 1,
      items: cart.map((item) => ({
        menu_item: item.menuItem.name,
        quantity: item.quantity,
        unit_price: item.menuItem.price.toString(),
        customizations: item.customizations.map((c) => ({
          customization: c.name,
          quantity: c.quantity,
        })),
      })),
    }

    const tokenString = `Token ${authToken}`

    const orderRes = await fetch(`${API_URL}/api/orders/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ['Authorization']: tokenString,
      },
      body: JSON.stringify(payload),
    })
    if (!orderRes.ok) {
      throw new Error(`Order failed:`)
    }

    const json = await orderRes.json()
    const slug = json.slug
    setOrderId(slug)
    cartDispatch({ type: 'CLEAR_CART' })
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {orderId ? (
        <QRCodeSVG value={orderId} />
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          <form onSubmit={handleSubmit} method="POST">
            <ul className="divide-y divide-gray-200 mb-6">
              {cart.map((orderItem, index) => (
                <li key={index}>
                  <Link
                    to="/menu/$slug"
                    params={{ slug: orderItem.menuItem.slug }}
                    search={{ orderItemId: orderItem.id }}
                  >
                    <CartItem orderItem={orderItem} />
                  </Link>
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
      )}
    </div>
  )
}
