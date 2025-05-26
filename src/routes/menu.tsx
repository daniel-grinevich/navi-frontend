import { createFileRoute } from '@tanstack/react-router'
import MenuItemsForm from '~/components/menu/MenuItemsForm'

export const Route = createFileRoute('/menu')({
  component: MenuPage,
})

function MenuPage() {
  return (
    <div>
      <h1>Menu Items</h1>
      <MenuItemsForm />
    </div>
  )
}
