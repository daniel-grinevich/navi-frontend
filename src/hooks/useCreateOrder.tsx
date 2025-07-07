import { useMutation, useQueryClient, QueryClient } from '@tanstack/react-query'
import { createOrder } from '~/utils/order/createOrder'
import { OrderPayload } from '../utils/order/createOrder'
import { useAuth } from './useAuth'

export function useCreateOrder() {
  const QueryClient = useQueryClient()
  const { authToken } = useAuth()

  return useMutation({
    mutationFn: (payload: OrderPayload) => createOrder(authToken, payload),
    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ['orders', authToken],
      })
    },
  })
}
