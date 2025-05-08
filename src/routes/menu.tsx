import { createFileRoute } from '@tanstack/react-router'
import { fetchMenuItems, MenuItemType } from '~/utils/menuItems'


export const Route = createFileRoute('/menu')({
  loader: async () => {

    const items = await fetchMenuItems()

    return { menuItems: items }
  },
  component: RouteComponent,
})

function RouteComponent() {
  // Destructure menuItems from loader data
  const { menuItems } = Route.useLoaderData()

  return (
    <div>
      {menuItems.map(item => (
        <div key={item.slug} className="p-4 border-b">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="mt-1 font-medium">${item.price}</p>
        </div>
      ))}
    </div>
  )
}