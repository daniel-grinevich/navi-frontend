import { createFileRoute } from '@tanstack/react-router'
<<<<<<< HEAD
import { fetchMenuItems, MenuItemType } from '~/utils/menuItems'
=======
import { fetchMenuItems,fetchFakeMenuItems } from '~/utils/menuItems'
import MenuItem from '~/components/MenuItem'

>>>>>>> 523d4d01fd73ec5ac2247f74577eeca5704c5ba3


export const Route = createFileRoute('/menu')({
  loader: async () => {

<<<<<<< HEAD
    const items = await fetchMenuItems()
=======
    const items = await fetchFakeMenuItems()
>>>>>>> 523d4d01fd73ec5ac2247f74577eeca5704c5ba3

    return { menuItems: items }
  },
  component: RouteComponent,
})

function RouteComponent() {
<<<<<<< HEAD
  // Destructure menuItems from loader data
=======
  
>>>>>>> 523d4d01fd73ec5ac2247f74577eeca5704c5ba3
  const { menuItems } = Route.useLoaderData()

  return (
    <div>
<<<<<<< HEAD
      {menuItems.map(item => (
        <div key={item.slug} className="p-4 border-b">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="mt-1 font-medium">${item.price}</p>
        </div>
=======
      <h1>Menu Items</h1>
      {menuItems.map(item => (
        <MenuItem key={item.slug} name={item.name} description={item.description} price={Number(item.price)}/>
>>>>>>> 523d4d01fd73ec5ac2247f74577eeca5704c5ba3
      ))}
    </div>
  )
}