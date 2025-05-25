import { createFileRoute } from '@tanstack/react-router'
import { fetchMenuItems, fetchFakeMenuItems } from '~/utils/menuItems'
import MenuItem from '~/components/MenuItem'

export const Route = createFileRoute('/menu')({
  loader: async () => {
    const items = await fetchFakeMenuItems()

    return { menuItems: items }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { menuItems } = Route.useLoaderData()

  return (
    <div>
      <h1>Menu Items</h1>
      {menuItems.map((item) => (
        <MenuItem
          key={item.slug}
          name={item.name}
          description={item.description}
          price={Number(item.price)}
        />
      ))}
    </div>
  )
}
