import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams }                                           from 'react-router-dom'
import { LinkCard, Loader }                                    from '../components'
import { AuthContext }                                         from '../context'
import { useHttp }                                             from '../hooks'

export const DetailPage = () => {
  const { token }              = useContext(AuthContext)
  const { id }                 = useParams()
  const { request, isLoading } = useHttp()
  const [link, setLink]        = useState(null)

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/links/${id}`, 'GET', null, { Authorization: `Bearer ${token}` })
      setLink(data)
    } catch (e) {}
  }, [request, id, token])

  useEffect(() => {
    getLink()
  }, [getLink])

  return isLoading ? <Loader/> : (
    <>
      {link && <LinkCard link={link}/>}
    </>
  )
}
