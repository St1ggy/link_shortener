import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinksList, Loader }                                   from '../components'
import { AuthContext }                                         from '../context'
import { useHttp }                                             from '../hooks'

export const LinksPage = () => {
  const [links, setLinks]      = useState([]),
        { isLoading, request } = useHttp(),
        { token }              = useContext(AuthContext),
        fetchLinks             = useCallback(async () => {
          try {
            const data = await request(
              '/api/links', 'GET', null,
              { Authorization: `Bearer ${token}` },
            )
            setLinks(data)
          } catch (e) {}
        }, [token, request])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  return isLoading ? <Loader/> : (
    <>
      <LinksList links={links}/>
    </>
  )
}
