import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'
import type { QueryClient } from '@tanstack/react-query'
import { CartContextProvider } from '~/context/CartContext'
import { AuthContextProvider } from '~/context/AuthContext'
import { Coffee } from 'lucide-react'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title:
          'TanStack Start | Type-Safe, Client-First, Full-Stack React Framework',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </CartContextProvider>
    </AuthContextProvider>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // const [cartState] = useCart()

  // const totalCartItems = React.useMemo(() => {
  //   return cartState.reduce((sum, item) => sum + item.quantity, 0)
  // }, [cartState])

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <div className="flex justify-center items-center">
          <nav>
            <ul className="flex flex-row gap-3 items-center w-full">
              <li className="p-3 text-lg">
                <Link
                  to="/"
                  activeProps={{
                    className: 'font-bold',
                  }}
                  activeOptions={{ exact: true }}
                >
                  Home
                </Link>
              </li>
              <li className="p-3 text-lg">
                <Link
                  to="/menu"
                  activeProps={{
                    className: 'font-bold',
                  }}
                  activeOptions={{ exact: true }}
                >
                  Menu
                </Link>
              </li>
              <li className="p-3 text-lg">
                <Link
                  to="/orders"
                  activeProps={{
                    className: 'font-bold',
                  }}
                  activeOptions={{ exact: true }}
                >
                  Orders
                </Link>
              </li>
              <li className="relative text-lg">
                <Link to="/cart" activeProps={{ className: 'font-bold' }}>
                  <Coffee />
                </Link>
                {/* {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {totalCartItems}
                  </span>
                )} */}
              </li>
            </ul>
          </nav>
        </div>
        <hr />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  )
}
