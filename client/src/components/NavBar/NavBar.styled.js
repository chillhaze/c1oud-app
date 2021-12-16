import styled from "@emotion/styled";

export const Wrapper = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #c2cde8f0;
  border-radius: 2px;
`;
export const LinkWrapper = styled.div`
  display: flex;
  color: #000;
`;

export const Image = styled.div`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
`;
export const Header = styled.div`
  padding-top: 4px;
  font-weight: bold;
`;
export const NavMenu = styled.div`
  display: flex;
`;
export const LinkContainer = styled.div`
  padding: 5px 15px;
  border-radius: 2px;
  cursor: pointer;
  box-shadow: 3px 6px 10px -6px #050505;
  background-color: rgb(239, 239, 239);
  &:hover {
    outline: 1px solid teal;
  }
  &:nth-of-type(2) {
    margin-left: 10px;
  }
  &:focus-visible {
    outline: 1px solid teal;
  }
`;
export const Login = styled.div`
  border: none;
  outline: none;
`;
export const Registration = styled.div`
  border: none;
  outline: none;
`;
export const Logout = styled.div`
  @media (max-width: 550px) {
    font-size: 12px;
  }
`;
export const SearchContainer = styled.div`
  padding: 1px;
`;
export const SearchInput = styled.input`
  width: 200px;
  height: 100%;
  padding: 0 5px;
  outline: none;
  border: none;
  border-radius: 2px;

  & :active,
  :focus {
    outline: 1px solid teal;
  }

  @media (max-width: 550px) {
    max-width: 120px;
  }
`;
