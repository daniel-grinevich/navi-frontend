import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '~/hooks/useAuth'
import { API_URL } from '~/constants/api'
import OrderCard from '~/components/OrderCard'
import NoData from '~/components/NoData'
import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X } from 'lucide-react'

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

  return (await response.json()) as Array<Order>
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
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedSlug, setSelectedSlug] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)

  const handleCancel = React.useCallback((slug: string) => {
     
  }, [])

  const handleQrClick = React.useCallback((slug: string) => {
    setSelectedSlug(slug)
    setIsOpen(true)
  }, [])

  const handleCloseModal = () => {
    setIsOpen(false)
    setSelectedSlug('')
  }

  React.useEffect(() => {
    if (isOpen !== true) return

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
        setSelectedSlug('')
      }
    }
    document.addEventListener('pointerdown', handleEvent)

    return () => {
      document.removeEventListener('pointerdown', handleEvent)
    }
  }, [isOpen])

  if (!authToken) return <div>Loading...</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong...</div>
  if (!data || data.length === 0)
    return (
      <NoData
        headerText="You have no orders!"
        bodyText=""
        buttonText="Start an Order"
        url="/menu"
      />
    )
  return (
    <div className="flex flex-col justify-center p-4 gap-3">
      {data.map((order) => (
        <OrderCard
          key={order.slug}
          order={order}
          onQrClick={handleQrClick}
          onCancel={}
        />
      ))}
      {isOpen && (
        <div
          ref={ref}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border p-4 rounded"
        >
          <button type="button" onClick={handleCloseModal}>
            <X color="red" />
          </button>
          <QRCodeSVG value={selectedSlug} />
        </div>
      )}
    </div>
  )
}
