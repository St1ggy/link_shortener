import 'materialize-css'
import React                       from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Loader, NavBar }          from './components'
import { AuthContext }             from './context'
import { useAuth }                 from './hooks'
import { useRoutes }               from './routes'

export const App = () => {
  const
    { token, userId, login, logout, isLogged } = useAuth(),
    isAuthenticated                            = !!token,
    routes                                     = useRoutes(isAuthenticated)

  return isLogged ? (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <NavBar/>}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  ) : <Loader/>
}
