import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/hooks/useAuth'
import { API_URL } from '~/constants/api'

interface Customization {
  order_item: number
  customization: string
  quantity: number
  unit_price: string
}

interface Item {
  slug: string
  menu_item: string
  quantity: number
  unit_price: string
  customizations: Customization[]
}

interface Order {
  slug: string
  price: number
  created_at: string
  items: Item[]
}

const fetchOrders = async (authToken: string) => {
  const tokenString = `Token ${authToken}`
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${tokenString}`,
    },
  })

  if (!response.ok) {
    throw new Error(
      `Error fetching orders: ${response.status} ${response.statusText}`
    )
  }

  return await response.json()
}

export const Route = createFileRoute('/orders/')({
  component: OrdersPage,
})

function OrdersPage() {
  const { authToken } = useAuth()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['orders', authToken],
    queryFn: () => fetchOrders(authToken),
  })
  if (!authToken) return <div>Loading...</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong...</div>
  return (
    <div>
      {data.map((order) => (
        <div
          key={order.slug}
          style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}
        >
          <h2>Order #{order.slug}</h2>
          <p>
            Placed at:{' '}
            {new Date(order.created_at).toLocaleString(undefined, {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </p>
          <p>
            <strong>Total:</strong> ${order.price.toFixed(2)}
          </p>

          <h3>Items</h3>
          <ul>
            {order.items.map((it) => (
              <li key={it.slug}>
                {it.menu_item} × {it.quantity} @ $
                {parseFloat(it.unit_price).toFixed(2)} each
                {it.customizations.length > 0 && (
                  <ul style={{ marginLeft: 16 }}>
                    {it.customizations.map((c, i) => (
                      <li key={i}>
                        {c.customization} × {c.quantity} @ $
                        {parseFloat(c.unit_price).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
