import { useSuspenseQuery } from '@tanstack/react-query'
import { ONE_DAY_MS, ONE_HOUR_MS } from '~/constants/api'
import { fetchMenuItem } from '~/utils/menu/fetchMenuItem'

export default function useMenuCustomizations(slug: string) {
  return useSuspenseQuery({
    queryKey: ['menuDetail', slug],
    queryFn: () => fetchMenuItem({ data: slug }),
    staleTime: 0,
    gcTime: 0,
  })
}
