import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { PostgresState } from "./context/postgresql/PostgresState";
import { useRoutes } from "./routes";
import { Header } from "./components/header/Header";
import { AuthState } from "./context/auth/AuthState";
import { LabelState } from "./context/label/LabelState";
import { ExpandHeaderState } from "./context/expandHeader/ExpandHeaderState";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const routes = useRoutes(isAuthenticated);
  return (
    <AuthState setAuthenticated={setAuthenticated}>
      <PostgresState>
        <LabelState>
          <ExpandHeaderState>
            <BrowserRouter>
              {isAuthenticated && <Header />}
              {routes}
            </BrowserRouter>
          </ExpandHeaderState>
        </LabelState>
      </PostgresState>
    </AuthState>
  );
}

export default App;
