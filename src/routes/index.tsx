import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="p-2">
      <h3>This should be the main home page.</h3>
      <h3>Things we want to accomplish</h3>
      <ul>
        <li>Add auth</li>
        <li>Add auth</li>
        <li>Add auth</li>
        <li>Add auth</li>
      </ul>
    </div>
  )
}
