import { Container, Header, Title, Button } from "./Upload.styled";
import UploadFile from "./UploadFile/UploaderFile";
import { VscClose } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";

const Uploader = () => {
  const isVisible = useSelector((state) => state.upload.isVisible);
  const dispatch = useDispatch();

  const files = useSelector((state) => state.upload.files);
  return (
    isVisible && (
      <Container>
        <Header>
          <Title>Loading...</Title>
          <Button onClick={() => dispatch(hideUploader())}>
            <VscClose
              style={{
                // width: "20px ",
                // height: "15px",
                // marginTop: "3px",
                padding: "4px 4px 2px 5px ",
                width: "100%",
                height: "100%",
              }}
            />
          </Button>
        </Header>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </Container>
    )
  );
};

export default Uploader;
