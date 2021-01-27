import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {Signup} from './pages/Signup'
import {History} from './pages/History'
import {Search} from './pages/Search'
import {Profile} from './pages/Profile'
import {PassRecovery} from './pages/PassRecovery'

function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/login'} component={Login}/>
          <Route path={'/signin'} component={Signup}/>
          <Route path={'/history'} component={History}/>
          <Route path={'/search'} component={Search}/>
          <Route path={'/profile'} component={Profile}/>
          <Route path={'/passwordrecovery'} component={PassRecovery}/>
        </Switch>
    </BrowserRouter>
      
  )
}

export default App
