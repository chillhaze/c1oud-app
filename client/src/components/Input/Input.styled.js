import styled from "@emotion/styled";

export const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 2px;
  border: 1px solid transparent;
  outline: none;
  box-shadow: 3px 6px 10px -6px #050505;
  &:focus {
    border: 1px solid teal;
  }
`;
