import { Route, Switch, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { History } from './pages/History'
import { Search } from './pages/Search'
import { Profile } from './pages/Profile'
import { PassRecovery } from './pages/PassRecovery'
import { TopQueries } from './pages/TopQueries'

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={'/'} exact component={Home} />
        <Route path={'/history'} exact component={History} />
        <Route path={'/search'} exact component={Search} />
        <Route path={'/profile'} exact component={Profile} />
        <Route path={'/passwordrecovery'} exact component={PassRecovery} />
        <Route path={'/topqueries'} exact component={TopQueries} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path={'/login'} exact component={Login} />
      <Route path={'/signin'} exact component={Signup} />
      <Redirect to="/login" />
    </Switch>
  )
}
