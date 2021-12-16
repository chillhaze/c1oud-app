import { NavLink } from "react-router-dom";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../../reducers/userReducer";
import {
  Wrapper,
  LinkWrapper,
  Image,
  Header,
  NavMenu,
  LinkContainer,
  Login,
  Registration,
  Logout,
  SearchContainer,
  SearchInput,
} from "../NavBar/NavBar.styled";
import { getFiles, searchFile } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";

const NavBar = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const currentDir = useSelector((state) => state.files.currentDir);

  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  const handleSearchInput = (e) => {
    setSearchName(e.target.value);

    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }

    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFile(e.target.value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <Wrapper>
      <LinkWrapper>
        <Image>
          <RiUploadCloud2Fill style={{ width: "25", height: "25" }} />
        </Image>
        <Header>c1oud</Header>
      </LinkWrapper>
      <NavMenu>
        {!isAuth && (
          <LinkContainer>
            <NavLink to="/signin">
              <Login>Sign in</Login>
            </NavLink>
          </LinkContainer>
        )}
        {!isAuth && (
          <LinkContainer>
            <NavLink to="/signup">
              <Registration>Sign up</Registration>
            </NavLink>
          </LinkContainer>
        )}
        {isAuth && (
          <SearchContainer>
            <SearchInput
              value={searchName}
              type="text"
              placeholder="enter file name"
              onChange={(e) => handleSearchInput(e)}
            />
          </SearchContainer>
        )}
        {isAuth && (
          <LinkContainer>
            <Logout onClick={() => dispatch(logoutUser())}>Logout</Logout>
          </LinkContainer>
        )}
      </NavMenu>
    </Wrapper>
  );
};

export default NavBar;
