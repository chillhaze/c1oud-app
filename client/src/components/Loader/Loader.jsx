import { LoaderWrapper, LoaderBody } from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderBody className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </LoaderBody>
    </LoaderWrapper>
  );
};

export default Loader;
