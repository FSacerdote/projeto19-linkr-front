import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function UserPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) navigate("/user/usuarioLogado");
  }, []);

  return (
    <Page>
      <Header></Header>
      <Timeline>
        <UserTitleContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt="userPhoto"
          />
          <h1>Nome de Usuário</h1>
        </UserTitleContainer>
        <Post></Post>
        <Post></Post>
        <Post></Post>
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
