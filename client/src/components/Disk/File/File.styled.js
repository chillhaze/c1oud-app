import styled from "@emotion/styled";

export const Container = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid #c2cde8f0;
  display: grid;
  grid-template-columns: 1fr 6fr repeat(4, 1fr);
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.005);
    cursor: pointer;

    & p:nth-of-type(2) {
      grid-column-start: 5;
    }

    & p:nth-of-type(3) {
      grid-column-start: 6;
    }

    & button:nth-of-type(1) {
      grid-column-start: 3;
      display: block;
    }
    & button:nth-of-type(2) {
      grid-column-start: 4;
      display: block;
      margin-left: 5px;
    }
  }

  /* font-size: 16px; */
  @media (max-width: 550px) {
    font-size: 10px;
    grid-template-columns: 1fr 6fr repeat(4, 2fr);
  }
`;
export const ImageWrapper = styled.div`
  width: 20px;
  height: 20px;
  color: teal;

  margin-left: 15px;

  @media (max-width: 550px) {
    margin-left: 0;
  }
`;
export const Name = styled.p`
  padding: 0 10px;

  @media (max-width: 550px) {
    overflow: hidden;
    font-size: 14px;
  }
`;
export const Date = styled.p`
  grid-column-start: 5;
  justify-self: center;
  overflow: hidden;
  font-size: 12px;

  @media (max-width: 755px) {
    font-size: 9px;
  }
  @media (max-width: 550px) {
    font-size: 8px;
  }
`;
export const Size = styled.p`
  grid-column-start: 6;
  justify-self: center;
  overflow: hidden;
  font-size: 12px;

  @media (max-width: 550px) {
    font-size: 8px;
  }
`;

export const Button = styled.button`
  display: none;
  @media (max-width: 550px) {
    font-size: 10px;
  }
`;
