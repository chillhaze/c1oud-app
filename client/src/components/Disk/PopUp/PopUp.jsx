import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VscClose } from "react-icons/vsc";
import { setPopupDisplay } from "../../../reducers/fileReducer";
import { createDir } from "../../../actions/file";
import {
  PopupContainer,
  PopupBody,
  PopupHeader,
  PopupTitle,
  PopupInputTitle,
  Button,
  Input,
} from "./PopUp.styled";

const PopUp = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useSelector((state) => state.files.popupDisplay);
  const currentDir = useSelector((state) => state.files.currentDir);
  const dispatch = useDispatch();

  const handlePopupClose = () => {
    dispatch(setPopupDisplay("none"));
  };

  const createDirHandler = () => {
    dispatch(createDir(currentDir, dirName));
    setDirName("");
    dispatch(setPopupDisplay("none"));
  };

  const handleInputChange = (e) => {
    setDirName(e.currentTarget.value);
  };

  return (
    <PopupContainer
      style={{ display: popupDisplay }}
      onClick={() => handlePopupClose()}
    >
      <PopupBody onClick={(e) => e.stopPropagation()}>
        <PopupHeader>
          <PopupTitle>Create folder</PopupTitle>
          <Button onClick={() => handlePopupClose()}>
            <VscClose
              style={{
                padding: "3px 3px 0px 3px ",
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </PopupHeader>
        <PopupInputTitle>
          <Input
            autoFocus
            type="text"
            placeholder="Enter folder name..."
            value={dirName}
            setValue={setDirName}
            onChange={handleInputChange}
          />
          <Button onClick={() => createDirHandler()}>create</Button>
        </PopupInputTitle>
      </PopupBody>
    </PopupContainer>
  );
};

export default PopUp;
