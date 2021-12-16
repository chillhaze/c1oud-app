import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { Wrapper } from "../App/App.styled";
import SignUp from "../Authorization/SignUp";
import SignIn from "../Authorization/SignIn";
import Disk from "../Disk/Disk";

import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../actions/user";
import { Toaster } from "react-hot-toast";
// import PrivateRoute from "../PrivateRoute/PrivateRoute";
// import PublicRoute from "../PublicRoute/PublicRoute";

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Wrapper>
        <Toaster
          position="bottom-center"
          toastOptions={{
            className: "",
            duration: 4000,
            style: {
              background: "#a0a6b6",
              color: "#fff",
            },
          }}
          containerStyle={{ marginBottom: "260px" }}
        />
        <NavBar />

        {!isAuth ? (
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>

            <Route path="/signin">
              <SignIn />
            </Route>

            <Redirect to="signin" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/">
              <Disk />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}

        {/* {!isAuth ? (
          <Switch>
            <PublicRoute path="/signup" restricted redirectTo={"/disk"}>
              <SignUp />
            </PublicRoute>

            <PublicRoute path="/signin" restricted redirectTo={"/disk"}>
              <SignIn />
            </PublicRoute>
          </Switch>
        ) : (
          <Switch>
            <PrivateRoute path="/" restricted redirectTo={"/"}>
              <Disk />
            </PrivateRoute>
          </Switch>
        )} */}
      </Wrapper>
    </BrowserRouter>
  );
};

export default App;
