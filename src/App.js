import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { PostgresState } from "./context/postgresql/PostgresState";
import { useRoutes } from "./routes";
import { Header } from "./components/header/Header";
import { LabelState } from "./context/label/LabelState";
import { ExpandHeaderState } from "./context/expandHeader/ExpandHeaderState";
import { GraphicState } from "./context/graphic/GraphicState";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthenticated,
  selectAuthLoading,
  userLogin,
} from "./reduxToolkit/SliceWithAPI/authSlice";
import { Loader } from "./components/loader/Loader";

function App() {
  const isAuthenticated = useSelector(selectAuthenticated);
  const loading = useSelector(selectAuthLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  const routes = useRoutes(isAuthenticated);
  return (
    <Fragment>
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <PostgresState>
          <GraphicState>
            <LabelState>
              <ExpandHeaderState>
                <BrowserRouter>
                  {isAuthenticated && <Header />}
                  {routes}
                </BrowserRouter>
              </ExpandHeaderState>
            </LabelState>
          </GraphicState>
        </PostgresState>
      )}
    </Fragment>
  );
}

export default App;
