import React from 'react'
import { useCreateOrder } from '~/hooks/useCreateOrder'
import { useCart } from '../hooks/useCart'
import { buildOrderPayload, OrderPayload } from '~/utils/order/createOrder'

export const checkoutContext = React.createContext({
  clientSecret: '',
  isLoading: false,
  handleCreateOrder: () => {},
})

export function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [orderId, setOrderId] = React.useState('')
  const [clientSecret, setClientSecret] = React.useState('')
  const { mutateAsync: createOrder, isPending } = useCreateOrder() // FYI mutation hook, idk if this is a good pattern tbh
  const [cart, dispatch] = useCart()

  const handleCreateOrder = React.useCallback(async () => {
    const payload = buildOrderPayload(cart)
    const response = await createOrder(payload)
    setClientSecret(response.client_secret)
    console.log(response.client_secret)
  }, [cart, createOrder])

  const value = React.useMemo(
    () => ({
      clientSecret,
      isLoading: isPending,
      handleCreateOrder,
    }),
    [clientSecret, isPending, handleCreateOrder]
  )

  console.log('rendering checkout context provider', clientSecret)

  return (
    <checkoutContext.Provider value={value}>
      {children}
    </checkoutContext.Provider>
  )
}
