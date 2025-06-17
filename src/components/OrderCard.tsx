import { API_URL } from '~/constants/api'
import { useAuth } from '~/hooks/useAuth'

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
  created_at: Date
  items: Item[]
}

interface orderProps {
  order: Order
  onQrClick: (slug: string) => void
}

const formatHumanDateOnly = (iso: Date, opts = {}) => {
  return new Date(iso).toLocaleDateString(undefined, {
    dateStyle: 'long',
    ...opts,
  })
}

export default function OrderCard({ order, onQrClick }: orderProps) {
  const authToken = useAuth()

  const handleCancel = async (slug: string) => {
    onQrClick(slug)
    const tokenString = `Token ${authToken}`
    try {
      const response = await fetch(`${API_URL}/api/orders/cancel-order`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenString}`,
        },
        body: JSON.stringify({ slug: slug }),
      })

      if (!response.ok) {
        throw new Error(
          `Cancel failed: ${response.status} ${response.statusText}`
        )
      }

      return await response.json()
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error')
    }
  }
  return (
    <div className="w-full p-3 border flex flex-row justify-between">
      <div className="flex flex-col">
        <p className="text-xs">{formatHumanDateOnly(order.created_at)}</p>
        <h5>Order No. #{order.slug}</h5>
      </div>
      <div>
        <p>${order.price}</p>
        <button
          className="border px-3 py-1"
          type="button"
          onClick={() => onQrClick(order.slug)}
        >
          QR Code
        </button>
        <button
          className="border px-3 py-1 bg-red-600"
          type="button"
          onClick={() => handleCancel(order.slug)}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
