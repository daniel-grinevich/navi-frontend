import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/menu')({
  component: RouteComponent,
  loader: async () => {
    console.log('Fetching menu items')
    return {
      menuItems: [
        {
          id: 1,
          name: 'Bruschetta',
          description: 'Grilled bread topped with tomato, basil, and olive oil',
          price: 6.50,
          category: 'Appetizer',
          available: true,
        },
      ],
    }
  }
})

function RouteComponent() {

  const { menuItems } = Route.useLoaderData();
  return (
    <div>
      {menuItems.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  )
}
