import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todo')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/todo"!</div>
}
