import styled from "@emotion/styled";

export const Container = styled.div`
  width: 330px;
  height: 210px;
  margin: 20px;
  padding: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: #c2cde8f0;
  border-radius: 2px;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 3px;

  & button {
    padding: 0;
    margin: 0;
  }
`;
export const Title = styled.h3`
  padding: 0 5px;
  font-size: 1.2rem;
`;
export const Button = styled.button``;
