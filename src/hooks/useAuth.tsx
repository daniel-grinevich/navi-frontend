import React from 'react'
import { authContext } from '~/context/AuthContext'

export function useAuth() {
  const context = React.useContext(authContext)
  if (!context) {
    throw new Error('useAuth must be used within a AuthContextProvider')
  }
  return context
}
