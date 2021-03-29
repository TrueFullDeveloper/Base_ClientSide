import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { PostgresState } from './context/postgresql/PostgresState';
import { useRoutes } from './routes';
import { Header } from './components/header/Header';
import { AuthState } from './context/auth/AuthState';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const routes = useRoutes(isAuthenticated);
  return (
    <AuthState setAuthenticated={setAuthenticated}>
      <PostgresState>
        <BrowserRouter>
          {isAuthenticated && <Header />}
          {routes}
        </BrowserRouter>
      </PostgresState>
    </AuthState>
  );
}

export default App;
