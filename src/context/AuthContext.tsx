import React from 'react'

const API_URL = import.meta.env.VITE_NAVI_API_URL
const USERNAME = import.meta.env.VITE_NAVI_USERNAME
const PASSWORD = import.meta.env.VITE_NAVI_PASSWORD

export const authContext = React.createContext({
  authToken: '',
  isAuthenticated: false,
  login: (username: string, password: string) => {},
  logout: () => {},
})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [authToken, setAuthToken] = React.useState('')

  React.useEffect(() => {
    const userToken = localStorage.getItem('userToken')
    const guestToken = localStorage.getItem('guestToken')
    setAuthToken(userToken || guestToken || '')
    setIsAuthenticated(!userToken)
  }, [])

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      throw new Error('Error in login params')
    }
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        throw new Error('Error fetching user token')
      }
      const { token } = await response.json()

      localStorage.setItem('userToken', token)

      setAuthToken(token)
      setIsAuthenticated(true)
    } catch (error) {
      throw new Error('Error fetching user token')
    }
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setAuthToken('')
    setIsAuthenticated(false)
  }

  React.useEffect(() => {
    const getGuestToken = async () => {
      try {
        const response = await fetch(`${API_URL}/api/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: USERNAME, password: PASSWORD }),
        })
        if (!response.ok) {
          throw new Error('Error fetching guest token')
        }
        const { token } = await response.json()
        localStorage.setItem('guestToken', token)
        setAuthToken(token)
      } catch (error) {
        console.error('Error fetching guest token:', error)
      }
    }
    getGuestToken()
  }, [])

  return (
    <authContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </authContext.Provider>
  )
}
