import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Header,
  ButtonWrapper,
  Button,
  InputWrapper,
  IconWrapper,
  InputTitle,
  Label,
  Input,
  DropArea,
  Select,
  Option,
  SelectWrapper,
  SelectTitle,
  FeaturesWrapper,
} from "./Disk.styled";
import FileList from "./FileList/FileList";
import { useEffect, useState } from "react";
import PopUp from "./PopUp/PopUp";

import { getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import { TiUpload } from "react-icons/ti";
import Uploader from "./Uploader/Uploader";
import Loader from "../Loader/Loader";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("date");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, dispatch, sort]);

  const handlePopupOpen = () => {
    dispatch(setPopupDisplay("flex"));
  };

  const handleBackButton = () => {
    const backDirId = dirStack.pop();

    if (backDirId === undefined) {
      return;
    }
    dispatch(setCurrentDir(backDirId));
  };

  const fileUploadHandler = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const onDroopHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (loader) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      {!dragEnter ? (
        <Container
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
        >
          <Header>
            <ButtonWrapper>
              <Button
                disabled={dirStack.length === 0 ? true : false}
                onClick={() => handleBackButton()}
              >
                Back
              </Button>
              <Button onClick={() => handlePopupOpen()}>Create folder</Button>
            </ButtonWrapper>
            <FeaturesWrapper>
              <InputWrapper>
                <Label htmlFor="disk__upload-input">
                  <InputTitle>Upload file</InputTitle>
                  <IconWrapper>
                    <TiUpload style={{ width: "100%", height: "100%" }} />
                  </IconWrapper>
                </Label>
                <Input
                  type="file"
                  id="disk__upload-input"
                  multiple={true}
                  onChange={(e) => fileUploadHandler(e)}
                />
              </InputWrapper>
              <SelectWrapper>
                <SelectTitle>sort by</SelectTitle>
                <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <Option value="name">name</Option>
                  <Option value="type">type</Option>
                  <Option value="date">date</Option>
                </Select>
              </SelectWrapper>
            </FeaturesWrapper>
          </Header>

          <FileList />
          <PopUp />
          <Uploader />
        </Container>
      ) : (
        <DropArea
          onDrop={onDroopHandler}
          onDragEnter={dragEnterHandler}
          onDragLeave={dragLeaveHandler}
          onDragOver={dragEnterHandler}
        >
          Drag files here
        </DropArea>
      )}
    </>
  );
};

export default Disk;
