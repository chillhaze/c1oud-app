import { useSelector } from "react-redux";
import {
  Container,
  FileListHeader,
  HeaderName,
  HeaderDate,
  HeaderSize,
  List,
  EmptyFolderWrapper,
  EmptyFolderTitle,
} from "./FileList.styled";
import File from "../File/File";
// animation
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { css, keyframes } from "@emotion/react";

const FileList = () => {
  const files = useSelector((state) => state.files.files);

  if (files.length === 0) {
    return (
      <EmptyFolderWrapper>
        <EmptyFolderTitle>Files not found</EmptyFolderTitle>
      </EmptyFolderWrapper>
    );
  }

  return (
    <Container>
      <FileListHeader>
        <HeaderName>Name</HeaderName>
        <HeaderDate>Date</HeaderDate>
        <HeaderSize>Size</HeaderSize>
      </FileListHeader>
      <List>
        {files && files.map((file) => <File key={file._id} file={file} />)}
      </List>
    </Container>
  );
};

export default FileList;
