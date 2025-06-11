import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrder } from '~/utils/cart/createOrder'
import { OrderPayload } from '../utils/cart/createOrder'

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: OrderPayload) => createOrder({ data: payload }),
  })
}
