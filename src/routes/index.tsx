import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 opacity-20 
                   animate-pulse"
      />

      <div className="relative z-10 text-center px-4">
        <h1
          className="text-6xl md:text-8xl font-extrabold uppercase bg-clip-text text-transparent
                     bg-gradient-to-r from-red-400 via-pink-600 to-purple-500
                     animate-pulse"
        >
          Coming Soon
        </h1>

        <p className="mt-4 text-gray-300 tracking-widest uppercase">
          Be the first to know
        </p>

        <form className="mt-8 flex justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="
              w-full max-w-md px-4 py-3 rounded-l-lg bg-gray-800 text-white placeholder-gray-500
              focus:ring-2 focus:ring-pink-500 focus:outline-none transition
            "
          />
          <button
            type="submit"
            className="
              px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold
              rounded-r-lg hover:from-pink-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400
              transition
            "
          >
            Notify Me
          </button>
        </form>
      </div>
    </div>
  )
}
