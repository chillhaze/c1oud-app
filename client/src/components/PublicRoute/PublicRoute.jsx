import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({
  restricted = false,
  redirectTo,
  children,
  ...publicRouteProps
}) {
  const isAuth = useSelector((state) => state.user.isAuth);

  const shouldRedirect = isAuth && restricted;
  return (
    <Route {...publicRouteProps}>
      {shouldRedirect ? <Redirect exact to={redirectTo} /> : children}
    </Route>
  );
}
