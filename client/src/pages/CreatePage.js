import React, { useContext, useState } from 'react'
import { useHistory }                  from 'react-router-dom'
import { AuthContext }                 from '../context'
import { useHttp }                     from '../hooks'

export const CreatePage = () => {
  const history         = useHistory()
  const { token }       = useContext(AuthContext)
  const { request }     = useHttp()
  const [link, setLink] = useState('')

  const onKeyPress = async ({ key }) => {
    if (key === 'Enter') {
      try {
        const data = await request(
          '/api/links/generate',
          'POST',
          { to: link },
          { Authorization: `Bearer ${token}` },
        )
        console.log({ data })
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className='row'>
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input id="link"
                 type="text"
                 name="link"
                 onChange={({ target: { value } }) => setLink(value)}
                 value={link}
                 onKeyPress={onKeyPress}
          />
          <label htmlFor="link">
            Ссылка для сокращения
          </label>
        </div>
      </div>
    </div>
  )
}
