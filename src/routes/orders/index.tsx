import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '~/hooks/useAuth'
import NoData from '~/components/NoData'
import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X } from 'lucide-react'
import useOrders from '~/hooks/useOrders'
import useCancelOrder from '~/hooks/useCancelOrder'

export const Route = createFileRoute('/orders/')({
  component: OrdersPage,
})

function OrdersPage() {
  const { authToken } = useAuth()
  const { data, isLoading, isError } = useOrders()
  const [qrOpen, setQrOpen] = React.useState(false)
  const [selectedSlug, setSelectedSlug] = React.useState('')
  const ref = React.useRef<HTMLDivElement>(null)
  const cancelOrder = useCancelOrder()

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
      e.stopPropagation()
      e.preventDefault()
      cancelOrder.mutate(slug)
    },
    [cancelOrder]
  )

  const handleEdit = React.useCallback((slug: string) => {}, [])

  const handleQrClick = React.useCallback((slug: string) => {
    setSelectedSlug(slug)
    setQrOpen(true)
  }, [])

  const handleCloseModal = () => {
    setQrOpen(false)
    setSelectedSlug('')
  }

  const handleItemClick = (slug: string) => {}

  React.useEffect(() => {
    if (qrOpen !== true) return

    const handleEvent = (e: MouseEvent | TouchEvent) => {
      console.log('event')
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setQrOpen(false)
        setSelectedSlug('')
      }
    }
    document.addEventListener('pointerdown', handleEvent)

    return () => {
      document.removeEventListener('pointerdown', handleEvent)
    }
  }, [qrOpen])

  if (!authToken) return <div>Loading...</div>
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Something went wrong...</div>
  if (!data || data.length === 0) {
    return (
      <NoData
        headerText="You have no orders!"
        bodyText=""
        buttonText="Start an Order"
        url="/menu"
      />
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 relative">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <ul className="space-y-4">
        {data.map((order) => {
          const expanded = selectedSlug === order.slug
          return (
            <li
              key={order.slug}
              onClick={() => handleItemClick(order.slug)}
              className={`rounded-lg shadow border p-4 mx-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transform transition-all duration-300 cursor-pointer
                ${expanded ? 'h-52 md:h-40 scale-105' : 'h-32 md:h-24 scale-95'}
              `}
            >
              <div>
                <p className="text-lg font-semibold">Order #{order.slug}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Placed at {new Date(order.created_at).toLocaleTimeString()}
                </p>
                {expanded && (
                  <div className="text-sm text-gray-700">
                    <p>Items: {order.items.length}</p>
                    <p>Total: ${order.price.toFixed(2)}</p>
                  </div>
                )}
              </div>

              <div className="mt-4 sm:mt-0 flex flex-wrap items-center space-x-4">
                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${
                      order.status === 'O'
                        ? 'bg-green-500 text-green-900' // Ordered → awaiting scan
                        : order.status === 'S'
                          ? 'bg-blue-500 text-white' // Sent to machine
                          : order.status === 'C'
                            ? 'bg-red-500 text-white' // Canceled
                            : 'bg-gray-300 text-gray-700' // Fallback
                    }
                  `}
                >
                  {order.status === 'O'
                    ? 'Ordered'
                    : order.status === 'S'
                      ? 'Paid'
                      : order.status === 'C'
                        ? 'Canceled'
                        : 'Error'}
                </span>

                <button
                  onClick={() => handleQrClick(order.slug)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Show QR
                </button>

                {order.status === 'O' && (
                  <>
                    <button
                      onClick={() => handleEdit(order.slug)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleCancel(e, order.slug)
                      }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      {qrOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div
            ref={ref}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <QRCodeSVG key={selectedSlug} value={selectedSlug} size={128} />
            <p className="mt-4 text-center text-sm text-gray-600">
              Order ID: {selectedSlug}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
