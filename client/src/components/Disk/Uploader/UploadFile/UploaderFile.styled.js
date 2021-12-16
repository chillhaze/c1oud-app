import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 5px 0;
  padding: 5px 10px;
  border: 1px solid #8993adf0;
  border-radius: 2px;
  background-color: #fff;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.h4``;
export const Button = styled.button``;
export const UploadProgress = styled.div`
  height: 1rem;
  margin: 3px 0;
  display: flex;
  border-radius: 2px;
  background-color: #8993adf0;
`;
export const UploadBar = styled.div`
  background-color: teal;
  width: 0;
  border-radius: 2px;
  text-align: center;
`;
export const UploadPercentage = styled.div`
  margin: 2px 0 0 0;
  color: #fff;
  font-size: 12px;
  left: 10%;
  position: absolute;
`;
