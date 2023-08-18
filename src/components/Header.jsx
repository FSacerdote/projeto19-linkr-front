import { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);

  const navigate = useNavigate();

  let timeout = null;

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyMjM3NDE0LCJleHAiOjE2OTQ4Mjk0MTR9.pTk293TceP9KoqZs0--sRtGwGxKwB6KF_miHpfEg6pc`,
    },
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/timeline")}>linkr</Logo>
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
      </SearchContainer>

      <User>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          alt=""
        />
      </User>
    </Container>
  );
}

const SearchIcon = styled(AiOutlineSearch)`
  font-size: 34px;
  position: absolute;
  top: 15%;
  right: 10px;
  color: #c6c6c6;
`;

const SearchContainer = styled.div`
  width: 30%;
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
`;

const SearchBar = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 8px;

  padding: 10px;

  background-color: #ffffff;
  border: none;
  outline: none;

  font-family: "lato", sans-serif;
  font-size: 19px;
  font-weight: 400;
  line-height: 23px;
  text-align: left;

  &::placeholder {
    color: #c6c6c6;
  }
`;

const SearchResult = styled.ul`
  width: 30%;
  height: fit-content;
  max-height: 300px;

  padding-top: 45px;

  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);

  border-radius: 8px;
  background-color: #e7e7e7;

  transition: max-height 0.2s ease-out;
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
  width: 100%;
  background-color: #151515;
  padding-left: 28px;
  padding-right: 17px;
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
  }
`;
