import { createContext } from 'react'

const f = () => {}

export const AuthContext = createContext({
  token          : null,
  userId         : null,
  login          : f,
  logout         : f,
  isAuthenticated: false,
})