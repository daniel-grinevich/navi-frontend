import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { fetchOrders } from '~/utils/order/fetchOrders'

export default function useOrders() {
  const { authToken } = useAuth()

  if (!authToken) {
    // Change to redirect to login
    throw new Error('Not authenticated')
  }

  return useSuspenseQuery({
    queryKey: ['orders', authToken],
    queryFn: () => fetchOrders(authToken!),
  })
}
