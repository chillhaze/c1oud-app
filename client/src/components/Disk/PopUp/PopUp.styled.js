import styled from "@emotion/styled";

export const PopupContainer = styled.div`
  width: 100%;
  height: 100vh;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
`;
export const PopupBody = styled.div`
  width: 400px;
  background-color: aliceblue;
  padding: 20px;
  border-radius: 2px;

  @media (max-width: 550px) {
    width: 350px;
  }
  @media (max-width: 350px) {
    width: 310px;
  }
`;
export const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & button {
    padding: 0;
    margin: 0;
  }
`;
export const PopupTitle = styled.div`
  padding-top: 5px;
`;
export const PopupInputTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Button = styled.button`
  padding: 5px 15px;
  align-self: flex-end;
`;
export const Input = styled.input`
  width: 100%;
  margin: 20px 0;
  padding: 0 5px;
  height: 30px;
`;
