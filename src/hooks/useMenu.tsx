import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { fetchMenuItems } from '~/utils/menu/fetchMenuItems'

export default function useMenu() {
  return useSuspenseQuery({
    queryKey: ['menuItems'],
    queryFn: () => fetchMenuItems(),
  })
}
