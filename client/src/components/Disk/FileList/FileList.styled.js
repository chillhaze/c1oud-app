import styled from "@emotion/styled";

export const Container = styled.div`
  margin: 20px 0;
  width: 100%;
`;
export const FileListHeader = styled.div`
  padding: 5px 0;
  display: grid;
  grid-template-columns: 1fr 6fr repeat(4, 1fr);
  font-weight: bold;
  border-bottom: 1px solid #c2cde8f0;

  @media (max-width: 550px) {
    grid-template-columns: 1fr 6fr repeat(4, 2fr);
  }
`;
export const HeaderName = styled.div`
  grid-column-start: 2;
  padding-left: 10px;
`;
export const HeaderDate = styled.div`
  grid-column-start: 5;
  justify-self: center;
`;
export const HeaderSize = styled.div`
  grid-column-start: 6;
  justify-self: center;
`;
export const List = styled.ul`
  grid-column-start: 6;
  justify-self: center;
`;

export const EmptyFolderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);

  @media (max-width: 550px) {
    height: calc(100vh - 150px);
  }
`;
export const EmptyFolderTitle = styled.h3`
  font-size: 36px;
  font-weight: bold;
  color: teal;

  @media (max-width: 550px) {
    font-size: 24px;
  }
`;
