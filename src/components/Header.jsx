import { useState, useContext } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import DataContextProvider from "../context/AuthContext";


export default function Header() {
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const {picture, config} = useContext(DataContextProvider) 
  const navigate = useNavigate();
  let timeout = null;
  
  function logout(){
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <>
      <Container>
        <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
        <div>
          <RotatingDiv onClick={() => setShowLogout(!showLogout)} $showLogout={showLogout}></RotatingDiv>
          <User>
            <img onClick={() => setShowLogout(!showLogout)}
              src={picture}
              alt=""         
            />
          </User>
          {showLogout && <LogoutBar onClick={() => {setShowLogout(false)}}><p onClick={logout}>Logout</p></LogoutBar>}
        </div>
      </Container>
      <SearchContainer>
        <SearchBar
          data-test="search"
          placeholder="Search for people"
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setFocus(false);
            }, 200);
          }}
          onChange={async (e) => {
            clearTimeout(timeout);
            setLoading(true);

            timeout = setTimeout(async function () {
              try {
                if (e.target.value.length >= 3) {
                  const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/${e.target.value}`,
                    config
                  );
                  setSearchList(res.data);
                  setLoading(false);
                }
              } catch (error) {
                setSearchList([]);
                console.log(error);
                return error;
              }
            }, 300);
          }}
        />
        <SearchIcon />
        <SearchResult>
          {!loading &&
            focus &&
            searchList.map((userFound) => {
              return (
                <ProfileLi
                  data-test="user-search"
                  key={userFound.id}
                  onClick={() => {
                    navigate(`/user/${userFound.id}`);
                  }}
                >
                  <img src={userFound.pictureUrl} alt={userFound.username} />
                  <h3>{userFound.username}</h3>
                </ProfileLi>
              );
            })}
        </SearchResult>
      </SearchContainer>
    </>
  );
}

const SearchIcon = styled(AiOutlineSearch)`
  font-size: 34px;
  position: absolute;
  top: 6px;
  right: 10px;
  color: #c6c6c6;

  z-index: 5;
  @media (max-width: 1000px) {
    top: 96px;
    font-size: 38px;
    right: 5%;
  }
`;

const SearchContainer = styled.div`
  @media (min-width: 1000px) {
    width: 30%;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
  }

  z-index: 4;

  @media (max-width: 1000px) {
    position: static;
    top: 0;
    left: 0;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;

  padding: 10px;

  position: absolute;
  top: 0;
  left: 0;

  background-color: #ffffff;
  border: none;
  outline: none;

  z-index: 5;

  font-family: "lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;

  &::placeholder {
    color: #c6c6c6;
  }
  @media (max-width: 1000px) {
    width: 95%;
    height: 60px;
    font-size: 24px;
    padding: 20px;
    top: 85px;
    left: 2.5%;
  }
`;

const SearchResult = styled.ul`
  width: 100%;
  height: fit-content;
  max-height: 300px;

  padding-top: 45px;

  position: absolute;
  top: 0;
  left: 0;

  z-index: 4;

  border-radius: 8px;
  background-color: #e7e7e7;

  transition: max-height 0.2s ease-out;

  z-index: 4;

  @media (max-width: 1000px) {
    width: 95%;
    padding-top: 60px;
    top: 85px;
    left: 2.5%;
  }
`;

const ProfileLi = styled.li`
  width: 100%;
  height: fit-content;

  display: flex;
  align-items: center;

  border-radius: 8px;

  user-select: none;

  padding: 5px;

  img {
    width: 39px;
    height: 39px;
    border-radius: 100%;
  }

  h3 {
    font-family: "Lato";
    font-size: 19px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 10px;
    color: #515151;
  }

  &:hover {
    cursor: pointer;
    background-color: #d6d5d5;
  }

  &:active {
    transform: scale(0.995);
    transition: 0.1s ease-out;
  }
`;

const Container = styled.div`
  z-index: 3;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  width: 100vw;
  background-color: #151515;
  padding-left: 28px;
  padding-right: 17px;

  @media(max-width: 1000px){
    z-index: 10;
  }

  >div {
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
  }
`;

const Logo = styled.p`
  font-family: "Passion One", cursive;
  color: white;
  font-size: 49px;
  font-weight: 700;
  letter-spacing: 2.45px;

  &:hover {
    cursor: pointer;
  }
`;

const User = styled.div`
  img {
    height: 53px;
    width: 53px;
    border-radius: 53px;
    cursor: pointer;
  }
`;

const LogoutBar =styled.div `
  position: absolute;
  top: 60px;
  left: -25px;
  width: 125px;
  background-color: #151515;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-bottom-left-radius: 25px;

  p {
    font-size: 17px;
    font-family: "Lato", sans-serif;
    font-weight: 700;
    letter-spacing: 0.7px;
    cursor: pointer;
  }
`;

const RotatingDiv = styled(FaChevronDown)`
  height: 25px;
  color: #ffffff;
  width: 25px;
  transition: transform 0.3s ease;
  cursor: pointer;

  transform: rotate(${(props) => {
    if (props.$showLogout) {
        return "180deg";
    }
    return "0";
  }});
`;
