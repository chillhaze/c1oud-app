import {
  Button,
  Container,
  Header,
  Title,
  UploadProgress,
  UploadBar,
  UploadPercentage,
} from "./UploaderFile.styled";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../../reducers/uploadReducer";

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Header>
        <Title>{file.name}</Title>
        <Button
          onClick={() => {
            dispatch(removeUploadFile(file.id));
          }}
        >
          remove
        </Button>
      </Header>
      <UploadProgress>
        <UploadBar style={{ width: file.progress + "%" }} />
        <UploadPercentage>{file.progress}%</UploadPercentage>
      </UploadProgress>
    </Container>
  );
};

export default UploadFile;
