import { styled } from "styled-components";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function TimelinePage() {
  const [contador, setContador] = useState(0);
  const [message, setMessage] = useState("Loading...");

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyMTYxOTc5LCJleHAiOjE2OTQ3NTM5Nzl9.vPyTUyhgbh2FXzjq4fbbjWXTICseCRA3FkmA2rqknGI`,
    },
  };
  const configRef = useRef(config);

  const [posts, setPosts] = useState(undefined);

  useEffect(() => {
    setPosts(undefined);
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`, configRef.current)
      .then((resposta) => {
        setPosts(resposta.data);
      })
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [contador]);

  if (!posts) {
    return (
      <Page>
        <Header></Header>
        <Timeline>
          <h1>timeline</h1>
          <PostForm contador={contador} setContador={setContador}></PostForm>
          <h2>{message}</h2>
        </Timeline>
        <TrendingBoard></TrendingBoard>
      </Page>
    );
  }

  return (
    <Page>
      <Header></Header>
      <Timeline>
        <h1>timeline</h1>
        <PostForm contador={contador} setContador={setContador}></PostForm>
        {posts.length === 0 ? (
          <h2>There are no posts yet</h2>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              contador={contador}
              setContador={setContador}
            />
          ))
        )}
      </Timeline>
      <TrendingBoard></TrendingBoard>
    </Page>
  );
}

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
