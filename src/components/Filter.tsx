import React from 'react'
import { ChevronUp, ChevronDown, Dot } from 'lucide-react'

interface FilterProps {
  filter: string
  isActive: boolean
  onDirectionChange: (newDirection: 'none' | 'asc' | 'desc') => void
}

export default function Filter({
  filter,
  isActive,
  onDirectionChange,
}: FilterProps) {
  const [direction, setDirection] = React.useState<'none' | 'asc' | 'desc'>(
    'none'
  )

  const handleClick = () => {
    let next: 'none' | 'asc' | 'desc'
    if (direction === 'none') next = 'asc'
    else if (direction === 'asc') next = 'desc'
    else next = 'none'

    setDirection(next)
    onDirectionChange(next)
  }

  return (
    <button
      value={filter}
      className={
        isActive
          ? 'border p-3 flex align-middle items-center border-indigo-500'
          : 'border p-3 flex align-middle items-center'
      }
      onClick={handleClick}
    >
      <div className="flex flex-row h-6 gap-3">
        <div>{filter}</div>
        <div>
          {direction === 'asc' && <ChevronUp className="inline h-4 w-4" />}
          {direction === 'desc' && <ChevronDown className="inline h-4 w-4" />}
          {direction === 'none' && <Dot className="inline h4 w-4" />}
        </div>
      </div>
    </button>
  )
}
