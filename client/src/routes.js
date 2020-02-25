import React                                           from 'react'
import { Redirect, Route, Switch }                     from 'react-router-dom'
import { AuthPage, CreatePage, DetailPage, LinksPage } from './pages'

export const useRoutes = (isAuthenticated) => {
  if (!isAuthenticated) {
    return <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  }
  return <Switch>
    <Route path="/links" exact>
      <LinksPage/>
    </Route>
    <Route path="/create" exact>
      <CreatePage/>
    </Route>
    <Route path="/detail/:id" exact>
      <DetailPage/>
    </Route>
    <Redirect to="/create"/>
  </Switch>
}