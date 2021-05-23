import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthenticated,
  selectAuthLoading,
  userLogin,
} from "./reduxToolkit/SliceWithAPI/authSlice";
import { Loader } from "./components/loader/Loader";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const loading = useSelector(selectAuthLoading);

  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  const routes = useRoutes(isAuthenticated);
  return (
    <Fragment>
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <BrowserRouter>{routes}</BrowserRouter>
      )}
    </Fragment>
  );
}

export default App;
