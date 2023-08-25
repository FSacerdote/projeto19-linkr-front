import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useEffect, useRef, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataContextProvider from "../context/AuthContext";
import { useInterval } from "usehooks-ts";
import LoadingMorePosts from "../components/LoadingMorePosts";
import AlertNewPosts from "../components/AlertNewPosts";
import { useWindowScroll } from "@uidotdev/usehooks";

export default function TimelinePage() {
  const { hashtag } = useParams();
  const [message, setMessage] = useState("Loading...");
  const [morePages, setMorePages] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [firstPostId, setFirstPostId] = useState(0);
  const [alertNewPosts, setAlertNewPosts] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { config } = useContext(DataContextProvider);
  const configRef = useRef(config);
  const [offset, setOffset] = useState(0);
  const [posts, setPosts] = useState([]);
  const [{ y }] = useWindowScroll();

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const fullPageHeight = document.documentElement.scrollHeight;
    if (
      y + windowHeight + 320 >= fullPageHeight &&
      !isPageLoading &&
      morePages
    ) {
      setIsPageLoading(true);
      getPosts(false);
    }
  }, [y]);

  function includeNewPosts() {
    setAlertNewPosts(false);
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
  }

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?untilId=${firstPostId}`,
        configRef.current
      )
      .then((resposta) => {
        const noRepeatedPosts = resposta.data.filter((newPost) => {
          return posts.some((post) => post.id === newPost.id);
        });
        if (noRepeatedPosts.length !== 0 && noRepeatedPosts[0] !== -1) {
          setOffset((prevOffset) => prevOffset + noRepeatedPosts.length);
          setNewPosts((prevPosts) => [...prevPosts, ...noRepeatedPosts]);
          setFirstPostId(noRepeatedPosts[0].id);
          setAlertNewPosts(true);
        }
      })
      .catch(() => {
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, 15000);

  function getPosts(isFirstPage) {
    const currentOffset = isFirstPage ? 0 : offset;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?limit=10&offset=${currentOffset}`,
        configRef.current
      )
      .then((resposta) => {
        if (isFirstPage && resposta.data.length === 0) {
          setIsPageLoading(false);
          return setPosts(["empty"]);
        }

        if (isFirstPage) {
          setPosts(resposta.data);
          setOffset(10);
          setFirstPostId(resposta.data[0].id);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...resposta.data]);
          setOffset((prevOffset) => prevOffset + 10);
        }

        if (resposta.data.length < 10) {
          setMorePages(false);
        } else {
          setMorePages(true);
        }
        setIsPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsPageLoading(false);
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  useEffect(() => {
    setIsPageLoading(true);
    setNewPosts([]);
    setPosts([]);
    setMorePages(false);
    setFirstPostId(0);
    setOffset(0);
    getPosts(true);
  }, [hashtag]);

  if (posts.length === 0) {
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
        {alertNewPosts && (
          <AlertNewPosts
            handleClick={includeNewPosts}
            number={newPosts.length}
          ></AlertNewPosts>
        )}
        {posts[0] === "empty" ? (
          <h2>There are no posts yet</h2>
        ) : (
          posts.map((post) => <Post key={post.id} post={post} />)
        )}
        {morePages && <LoadingMorePosts />}
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
