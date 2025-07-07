import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from './useAuth'
import { fetchOrders, Order } from '~/utils/order/fetchOrders'
import { cancelOrder } from '~/utils/order/cancelOrder'

export default function useCancelOrder() {
  const queryClient = useQueryClient()
  const { authToken } = useAuth()

  return useMutation({
    mutationFn: (slug: string) => cancelOrder(authToken, slug),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders', authToken],
      })
    },
  })
}
