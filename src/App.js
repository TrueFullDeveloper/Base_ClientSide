import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PostgresState } from './context/postgresql/PostgresState'
import { useRoutes } from './routes'
import { Header } from './components/header/Header'

function App() {
  const isAuthenticated = true
  const routes = useRoutes(isAuthenticated)
  return (
    <PostgresState>
      <BrowserRouter>
        {isAuthenticated && <Header />}
        {routes}
      </BrowserRouter>
    </PostgresState>
  )
}

export default App
