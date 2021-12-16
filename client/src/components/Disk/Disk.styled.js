import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 10px;
  width: 100%;
  height: calc(100vh - 55px - 40px);
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ButtonWrapper = styled.div`
  display: flex;

  & button:nth-of-type(2) {
    margin-left: 20px;

    @media (max-width: 550px) {
      margin-left: 7px;
    }
  }
`;
export const Button = styled.button`
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  border: 1px solid #c2cde8f0;
  /* box-shadow: 3px 6px 10px -6px #050505; */
  cursor: pointer;
  &:hover {
    border: 1px solid teal;
  }

  &:disabled {
    color: #c2cde8d6;
    border: 1px solid #c2cde8d6;
  }
`;
export const FeaturesWrapper = styled.div`
  display: flex;
`;

export const InputWrapper = styled.div`
  display: flex;
`;
export const IconWrapper = styled.div`
  width: 15px;
  height: 18px;
  color: teal;
`;
export const Label = styled.label`
  border: 1px solid #c2cde8f0;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;

  &:hover {
    border: 1px solid teal;
  }
`;
export const Input = styled.input`
  margin-left: 10px;
  display: none;
`;
export const InputTitle = styled.div`
  margin-right: 5px;
  padding-top: 3px;
  /* font-size: 10px; */
  @media (max-width: 550px) {
    display: none;
  }
`;
export const DropArea = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;

  height: calc(100vh - 55px - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8993adf0;
  font-size: 40px;
  border: 3px dashed #c2cde8f0;
`;
export const SelectWrapper = styled.div`
  margin: 0px 0 0 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;
export const SelectTitle = styled.h5`
  padding: 1px;
  font-size: 10px;

  background-color: aliceblue;
`;
export const Select = styled.select`
  padding: 2px;

  color: #8993adf0;
  background-color: aliceblue;

  border: 1px solid #8993adf0;
  border-radius: 2px;

  font-size: 10px;
  font-weight: bold;
  letter-spacing: 0.15em;

  &:focus,
  &:active {
    outline: 0;
    color: teal;
  }
`;
export const Option = styled.option`
  font-weight: bold;
  color: #8993adf0;
`;
