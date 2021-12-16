import {
  Container,
  ImageWrapper,
  Name,
  Date,
  Size,
  Button,
} from "./File.styled";
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../actions/file";
import sizeFormat from "../../utils/sizeFormat";

const File = ({ file }) => {
  const shortDate = file.date.slice(0, 10);
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);

  const openDirHandler = () => {
    if (file.type === "dir") {
      dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file._id));
    }
    return;
  };

  const downloadClickHandler = (e) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteClickHandler = (e) => {
    e.stopPropagation();
    console.log(file);
    dispatch(deleteFile(file));
  };

  return (
    <Container onClick={() => openDirHandler()}>
      <ImageWrapper>
        {file.type === "dir" ? (
          <FcFolder style={{ width: "100%", height: "100%" }} />
        ) : (
          <FcFile style={{ width: "100%", height: "100%" }} />
        )}
      </ImageWrapper>
      <Name>{file.name}</Name>
      <Button onClick={(e) => deleteClickHandler(e)}>Delete</Button>
      {file.type !== "dir" && (
        <Button onClick={(e) => downloadClickHandler(e)}>Download</Button>
      )}
      <Date>{shortDate}</Date>
      <Size>{sizeFormat(file.size)}</Size>
    </Container>
  );
};

export default File;
