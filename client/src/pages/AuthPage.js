import React, { useContext, useEffect, useState } from 'react'

import { AuthContext }         from '../context'
import { useHttp, useMessage } from '../hooks'

export const AuthPage = () => {
  const [form, setForm]                           = useState({ email: '', password: '' }),
        { isLoading, request, error, clearError } = useHttp(),
        message                                   = useMessage(),
        { login }                                 = useContext(AuthContext)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(window.M.updateTextFields, [])

  const onRegister = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', form)
      message(data.message)
    } catch (e) {}
  }
  const onLogin    = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', form)
      message(data.message)
      login(data.token, data.userId)
    } catch (e) {}
  }

  const onFieldChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value })
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Link Shortener</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input id="email"
                       type="email"
                       className="yellow-input"
                       name="email"
                       onChange={onFieldChange}
                       value={form.email}
                />
                <label htmlFor="email">
                  E-mail
                </label>
              </div>
              <div className="input-field">
                <input id="password"
                       type="password"
                       className="yellow-input"
                       name="password"
                       onChange={onFieldChange}
                       value={form.password}
                />
                <label htmlFor="password">
                  Пароль
                </label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              onClick={onLogin}
              className="btn yellow darken-4"
              style={{ marginRight: 16 }}
              disabled={isLoading}
            >
              Войти
            </button>
            <button
              onClick={onRegister}
              className="btn grey lighten-1 black-text"
              disabled={isLoading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
