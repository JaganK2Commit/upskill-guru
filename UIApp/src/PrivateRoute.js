import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return localStorage.getItem("user") ? children : <Redirect to="/" />;
      }}
    />
  );
}

export default PrivateRoute;
