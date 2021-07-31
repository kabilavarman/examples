import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authorization from "../utility/authorization";
import Application from "../containers/Application";

/**
 * If we have a logged-in user, display the component, otherwise redirect to login page.
 */
const PrivateRoute = ({ component: Component, meta, permission, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Authorization.isLoggedIn()) {
          // Un-comment below code when implement the roles & permission

          // if(permission && !Authorization.isAuthorizedPage(permission)){
          //     Component = Loadable({
          //         loader: () => import ('../error/AccessDenied'),
          //         loading: Loader,
          //     })
          // }

          return (
            <Application
              {...props}
              isLoggedIn={Authorization.isLoggedIn}
              auth={Authorization}
              component={Component}
            />
          );
        } else {
          sessionStorage.setItem("proute", JSON.stringify(props.location));
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
