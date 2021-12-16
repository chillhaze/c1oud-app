import React, { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../Input/Input";
import { AuthorizationBody, Title, Button } from "./Authorization.styled";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthorizationBody>
      <Title>Sign Up</Title>
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
      <Button onClick={() => registration(email, password)}>Enter</Button>
    </AuthorizationBody>
  );
};

export default SignUp;
