import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
import { QueryClient, QueryCache } from '@tanstack/react-query'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import toast from 'react-hot-toast'
import LoadingSpinner from './components/skeletons/LoadingSpinner'

const queryClient = new QueryClient({
  defaultOptions: {
    //if there's data in the cache and the query goes into an error state, since the user is most likely already seeing the existing data, we show a toast notification. Otherwise, we throw the error to an ErrorBoundary.
    queries: {
      throwOnError: (error, query) => {
        return typeof query.state.data === 'undefined'
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (typeof query.state.data !== 'undefined') {
        toast.error(error.message)
      }
    },
  }),
})

export function createRouter() {
  const router = routerWithQueryClient(
    createTanStackRouter({
      routeTree,
      defaultPreload: 'intent',
      defaultPendingComponent: LoadingSpinner,
      defaultErrorComponent: DefaultCatchBoundary,
      defaultNotFoundComponent: () => <NotFound />,
      scrollRestoration: true,
    }),
    queryClient
  )

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
