import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { fetchOrders } from '~/utils/order/fetchOrders'

export default function useOrders() {
  const { authToken } = useAuth()

  return useQuery({
    queryKey: ['orders', authToken],
    queryFn: () => fetchOrders(authToken!),
    enabled: !!authToken,
  })
}
