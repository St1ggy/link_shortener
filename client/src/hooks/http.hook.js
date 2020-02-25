import { useCallback, useState } from 'react'

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError]         = useState(null)

  const request = useCallback(async (
    endPoint,
    method  = 'GET',
    body    = null,
    headers = {},
  ) => {
    setIsLoading(true)
    try {
      if (body) {
        body                    = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }
      const res  = await fetch(endPoint, { method, body, headers })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }

      return data
    } catch (e) {
      setError(e.message)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { isLoading, error, request, clearError }
}