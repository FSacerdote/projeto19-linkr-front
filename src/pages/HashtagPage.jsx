import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataContextProvider from "../context/AuthContext";
import InfiniteScroll from "react-infinite-scroller";
import { useInterval } from "usehooks-ts";

export default function TimelinePage() {
  const { hashtag } = useParams();
  const [message, setMessage] = useState("Loading...");
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [morePages, setMorePages] = useState(true);
  const [newPosts, setNewPosts] = useState([]);
  const [firstPostId, setFirstPostId] = useState(0);
  const [alertNewPosts, setAlertNewPosts] = useState(false);

  const { config } = useContext(DataContextProvider);
  const configRef = useRef(config);

  const [posts, setPosts] = useState(undefined);

  function includeNewPosts() {
    setAlertNewPosts(false);
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
  }

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}/new/${firstPostId}`,
        configRef.current
      )
      .then((resposta) => {
        if (resposta.data.length !== 0) {
          setOffset((prevOffset) => prevOffset + resposta.data.length);
          setNewPosts((prevPosts) => [...prevPosts, ...resposta.data]);
          setFirstPostId(resposta.data[0].id);
          setAlertNewPosts(true);
        }
      })
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, 15000);

  useEffect(() => {
    if (page === 0) {
      setPosts(undefined);
    }
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?limit=10&offset=${offset}`,
        configRef.current
      )
      .then((resposta) => {
        setOffset((prevOffset) => prevOffset + 10);
        setPosts((prevPosts) => [...prevPosts, ...resposta.data]);
        if (resposta.data.length < 10) {
          setMorePages(false);
        }
        if (page === 0) {
          setFirstPostId(resposta.data[0].id)
        }
      })
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [hashtag, page]);

  if (!posts) {
    return (
      <Page>
        <Header></Header>
        <Timeline>
          <h1 data-test="hashtag-title"># {hashtag}</h1>
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
        <h1 data-test="hashtag-title"># {hashtag}</h1>
        {alertNewPosts && <h2 onClick={includeNewPosts}>NewPosts {newPosts.length}</h2>}
        {posts.length === 0 ? (
          <h2>There are no posts yet</h2>
        ) : ( 
          <InfiniteScroll
            pageStart={1}
            loadMore={() => setPage((prevPage) => prevPage + 1)}
            hasMore={morePages}
            loader={<h2>Loading...</h2>}
          >
            {posts.map((post) => <Post key={post.id} post={post} />)}
          </InfiniteScroll>
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
    margin-bottom: 27px;
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
