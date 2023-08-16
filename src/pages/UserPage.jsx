import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const REACT_APP_API_URL = "http://localhost:5000";

  useEffect(() => {
    async function getInfo() {
      const userRes = await axios.get(`${REACT_APP_API_URL}/${id}/user`);
      setUserInfo(userRes.data);

      const postRes = await axios.get(`${REACT_APP_API_URL}/${id}/posts`);
      setPostList(postRes.data);
    }

    if (!id) return navigate("/timeline");

    console.log(id);
    getInfo();
  }, []);

  return (
    <Page>
      <Header></Header>
      <Timeline>
        <UserTitleContainer>
          <img src={userInfo.pictureUrl} alt={userInfo.username} />
          <h1>{userInfo.username}</h1>
        </UserTitleContainer>
        {postList &&
          postList.map((post) => {
            return <Post />;
          })}
      </Timeline>
      <TrendingBoard></TrendingBoard>
    </Page>
  );
}

const UserTitleContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  margin-bottom: 27px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
    margin-right: 20px;
    margin-left: 17px;
  }
`;

const Page = styled.div`
  height: 100vh;
  background-color: #333;
  padding-top: 72px;
  display: flex;
  justify-content: center;
`;

const Timeline = styled.div`
  padding-bottom: 20px;
  overflow: scroll;
  margin-top: 53px;
  width: 611px;
  display: flex;
  flex-direction: column;
  h1 {
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
