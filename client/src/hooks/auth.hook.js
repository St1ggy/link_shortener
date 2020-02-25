import { useCallback, useEffect, useState } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken]     = useState(null)
  const [isLogged, setIsLogged] = useState(false)
  const [userId, setUserId]   = useState(null)

  const login  = useCallback((jwtToken, id) => {
          setToken(jwtToken)
          setUserId(id)

          localStorage.setItem(
            storageName,
            JSON.stringify({ userId: id, token: jwtToken }),
          )
        }, []),
        logout = useCallback(() => {
          setToken(null)
          setUserId(null)

          localStorage.removeItem(storageName)
        }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId)
    }
    setIsLogged(true)
  }, [login])

  return { login, logout, token, userId, isLogged }
}