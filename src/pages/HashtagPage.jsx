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

export default function TimelinePage() {
  const { hashtag } = useParams();
  const [message, setMessage] = useState("Loading...");
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const [morePages, setMorePages] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [firstPostId, setFirstPostId] = useState(0);
  const [alertNewPosts, setAlertNewPosts] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const { config } = useContext(DataContextProvider);
  const configRef = useRef(config);

  const [posts, setPosts] = useState([]);

  function includeNewPosts() {
    setAlertNewPosts(false);
    setPosts((prevPosts) => [...newPosts, ...prevPosts]);
  }

  useInterval(() => {
    //axios
    //  .get(
    //    `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}/new/${firstPostId}`,
    //    configRef.current
    //  )
    //  .then((resposta) => {
    //    if (resposta.data.length !== 0) {
    //      setOffset((prevOffset) => prevOffset + resposta.data.length);
    //      setNewPosts((prevPosts) => [...prevPosts, ...resposta.data]);
    //      setFirstPostId(resposta.data[0].id);
    //      setAlertNewPosts(true);
    //    }
    //  })
    //  .catch(() => {
    //    setMessage(
    //      "An error occured while trying to fetch the posts, please refresh the page"
    //    );
    //  });
  }, 15000);

  function getPosts(currentPage) {
    setPageLoading(true);
    const currentOffset = currentPage === 0 ? 0 : offset;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}?limit=10&offset=${currentOffset}`,
        configRef.current
      )
      .then((resposta) => {
        if (currentPage === 0 && resposta.data.length === 0) {
          setPageLoading(false);
          return setPosts(["empty"]);
        }
        setOffset((prevOffset) => prevOffset + 10);
        setPosts((prevPosts) => [...prevPosts, ...resposta.data]);

        if (resposta.data.length < 10) {
          setMorePages(false);
        } else {
          setMorePages(true);
        }
        setPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setMessage(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  function handleScroll() {
    const windowHeight = window.innerHeight;
    const fullPageHeight = document.documentElement.scrollHeight;
    const scrolledHeight = window.scrollY;

    if (scrolledHeight + windowHeight >= fullPageHeight) {
      //getPosts(page+1);
      //setPage(prevPage => prevPage + 1);
      console.log("oi");
    }
  }

  useEffect(() => {
    setNewPosts([]);
    setPageLoading(true);
    setPosts([]);
    setMorePages(false);
    setFirstPostId(0);
    setOffset(0);
    setPage(0);
    getPosts(0);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
          <h2 onClick={includeNewPosts}>NewPosts {newPosts.length}</h2>
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
