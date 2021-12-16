import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import Input from "../Input/Input";
import { AuthorizationBody, Title, Button } from "./Authorization.styled";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  return (
    <AuthorizationBody>
      <Title>Sign In</Title>
      <Input
        value={email}
        setValue={setEmail}
        type="email"
        placeholder="Email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Password"
      />
      <Button onClick={() => dispatch(login(email, password))}>Enter</Button>
    </AuthorizationBody>
  );
};

export default Signin;
