import { useQuery } from '@tanstack/react-query'
import { fetchMenuItems } from '~/utils/menu/fetchMenuItems'

export default function useMenu() {
  return useQuery({
    queryKey: ['menuItems'],
    queryFn: () => fetchMenuItems(),
  })
}
