import { useMutation, useQueryClient } from '@tanstack/react-query'

function createOrder({ id, newName }) {
  return fetch(`/user/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: newName,
    }),
  }).then((res) => res.json())
}

export function useCreateOrder() {
  const qc = useQueryClient()

  return useMutation<Order, Error, NewOrder>({
    onMutate: async (newOrder) => {
      await qc.cancelQueries(['orders'])
      const previous = qc.getQueryData<Order[]>(['orders'])
      qc.setQueryData(['orders'], (old: Order[] = []) => [
        ...old,
        { id: 'temp-id', ...newOrder } as Order,
      ])
      return { previous }
    },
    onError: (_err, _newOrder, context: any) => {
      qc.setQueryData(['orders'], context.previous)
    },
    onSettled: () => {
      qc.invalidateQueries(['orders'])
    },
  })
}
