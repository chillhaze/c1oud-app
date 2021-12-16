import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({ children, ...privateRouteProps }) {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <Route {...privateRouteProps}>
      {isAuth ? children : <Redirect to="/login" />}
    </Route>
  );
}
