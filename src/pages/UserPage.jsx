/* eslint-disable react-hooks/exhaustive-deps */
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

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyMjM3NDE0LCJleHAiOjE2OTQ4Mjk0MTR9.pTk293TceP9KoqZs0--sRtGwGxKwB6KF_miHpfEg6pc`,
    },
  };

  useEffect(() => {
    async function getInfo() {
      try {
        const userRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/${id}/user`,
          config
        );
        setUserInfo(userRes.data);

        const postRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/${id}/posts`,
          config
        );
        setPostList(postRes.data);
      } catch (error) {
        console.log(error);
        return error;
      }
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
          {userInfo.username && (
            <>
              <img src={userInfo.pictureUrl} alt={userInfo.username} />
              <h1>{userInfo.username}'s posts</h1>
            </>
          )}
        </UserTitleContainer>
        {postList &&
          postList.map((post) => {
            return <Post post={post} />;
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
  min-height: 100vh;
  background-color: #333;
  padding-top: 72px;
  display: flex;
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 0 20px;
  }
`;

const Timeline = styled.div`
  padding-bottom: 20px;
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
  h2 {
    color: #fff;
    font-family: "Oswald", sans-serif;
    font-size: 43px;
    font-weight: 700;
    text-align: center;
  }
  @media (max-width: 1000px) {
    margin-top: 20px;
  }
`;
