import styled from "@emotion/styled";

export const AuthorizationBody = styled.div`
  margin: 100px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  background-color: #c2cde8f0;
  box-shadow: 5px 7px 16px -7px #050505;
`;
export const Title = styled.h2`
  font-size: 24;
  margin-bottom: 20px;
`;
export const Button = styled.button`
  margin-top: 5px;
  padding: 5px;
  width: 100%;

  border: none;
  border-radius: 2px;
  cursor: pointer;
  outline: none;
  box-shadow: 3px 6px 10px -6px #050505;

  &:hover {
    outline: 1px solid teal;
  }
  &:active {
    background-color: #fff;
  }
  &:focus-visible {
    outline: 1px solid teal;
  }
`;
