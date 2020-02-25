import { useCallback } from 'react'

export const useMessage = () => useCallback((html) => {
  if (window.M && html) {
    window.M.toast({ html })
  }
}, [])
