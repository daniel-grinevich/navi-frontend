import React from 'react'

interface SearchProps {
  searchInput: string
  onInputChange: (search: string) => void
}

export default function Search({ searchInput, onInputChange }: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value)
  }

  return (
    <div>
      <h3 className="text-xl">Search</h3>
      <div className="w-full max-w-md">
        <input
          type="text"
          value={searchInput}
          placeholder="Search for menu item"
          onChange={handleChange}
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-400
            placeholder-gray-500
          "
        />
      </div>
    </div>
  )
}
