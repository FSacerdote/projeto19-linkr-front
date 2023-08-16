import { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchList, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const REACT_APP_API_URL = "http://localhost:5000";

  let timeout = null;

  return (
    <Container>
      <Logo>linkr</Logo>
      <SearchContainer>
        <SearchResult>
          {!loading &&
            searchList.map((userFound) => {
              if (searchList.length > 0) {
                return (
                  <ProfileLi
                    key={userFound.id}
                    onClick={() => {
                      navigate(`/user/${userFound.id}`);
                    }}
                  >
                    <img src={userFound.pictureUrl} alt={userFound.username} />
                    <h3>{userFound.username}</h3>
                  </ProfileLi>
                );
              } else return <li className="noResults">No results...</li>;
            })}
        </SearchResult>
        <SearchBar
          placeholder="Search for people"
          onChange={async (e) => {
            try {
              clearTimeout(timeout);
              setLoading(true);

              timeout = setTimeout(async function () {
                if (e.target.value.length > 3) {
                  const res = await axios.get(
                    `${REACT_APP_API_URL}/users/${e.target.value}`
                  );
                  setSearchList(res.data);
                  setLoading(false);
                }
              }, 300);
            } catch (error) {
              console.log(error);
            }
          }}
        />
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

const SearchContainer = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const SearchBar = styled.input`
  width: 563px;
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
  width: 100%;
  height: fit-content;
  max-height: 300px;

  position: absolute;
  top: 45px;
  left: 0;

  border-radius: 8px;
  background-color: #e7e7e7;

  transition: max-height 0.2s ease-out;

  li.noResults {
    width: 100%;
    font-family: "Lato";
    font-size: 32px;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 0em;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 30px;
    color: #515151;
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
`;

const User = styled.div`
  img {
    height: 53px;
    width: 53px;
    border-radius: 53px;
  }
`;
