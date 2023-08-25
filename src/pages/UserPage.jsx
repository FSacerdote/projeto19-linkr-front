/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContextProvider from "../context/AuthContext";
import { useInterval } from "usehooks-ts";
import LoadingMorePosts from "../components/LoadingMorePosts";
import AlertNewPosts from "../components/AlertNewPosts";
import { useWindowScroll } from "@uidotdev/usehooks";

export function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [following, setFollowing] = useState(false);
  const [button, setButton] = useState(true);
  const [contador, setContador] = useState(0);

  const [{ y }] = useWindowScroll();
  const [offset, setOffset] = useState(0);
  const [morePages, setMorePages] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [firstPostId, setFirstPostId] = useState(0);
  const [alertNewPosts, setAlertNewPosts] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  const { config, userId } = useContext(DataContextProvider);
  const myPage = Number(userId) === Number(id);

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
    setPostList((prevPosts) => [...newPosts, ...prevPosts]);
  }

  useInterval(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/${id}/posts?untilId=${firstPostId}`,
        config
      )
      .then((resposta) => {
        const noRepeatedPosts = resposta.data.filter((newPost) => {
          return postList.some((post) => post.id === newPost.id);
        });
        if (noRepeatedPosts.length !== 0 && noRepeatedPosts[0] !== -1) {
          setOffset((prevOffset) => prevOffset + noRepeatedPosts.length);
          setNewPosts((prevPosts) => [...prevPosts, ...noRepeatedPosts]);
          setFirstPostId(noRepeatedPosts[0].id);
          setAlertNewPosts(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 15000);

  function getPosts(isFirstPage) {
    const currentOffset = isFirstPage ? 0 : offset;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/${id}/posts?limit=10&offset=${currentOffset}`,
        config
      )
      .then((resposta) => {
        if (isFirstPage && resposta.data.length === 0) {
          setIsPageLoading(false);
          return setPostList(["empty"]);
        }

        if (isFirstPage) {
          setPostList(resposta.data);
          setOffset(10);
          setFirstPostId(resposta.data[0].id);
        } else {
          setPostList((prevPosts) => [...prevPosts, ...resposta.data]);
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
      });
  }

  useEffect(() => {
    setIsPageLoading(true);
    setNewPosts([]);
    setPostList([]);
    setMorePages(false);
    setFirstPostId(0);
    setOffset(0);
    getPosts(true);

    async function getInfo() {
      try {
        const userRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/${id}/user`,
          config
        );
        setUserInfo(userRes.data);
      } catch (error) {
        console.log(error);
        return error;
      }
    }

    if (!id) return navigate("/timeline");
    axios
      .get(`${process.env.REACT_APP_API_URL}/follows/${id}`, config)
      .then((resposta) => {
        setButton(false);
        setFollowing(resposta.data.follows);
      })
      .catch((erro) => {
        alert("Não foi possível completar a requisição");
        console.log(erro);
      });
    getInfo();
  }, [id, contador]);

  function handleFollows() {
    setButton(true);
    if (following) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/follows/${id}`, config)
        .then(() => {
          setButton(false);
          setFollowing(false);
        })
        .catch(() => {
          setButton(false);
          alert("Não foi possível completar a requisição");
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/follows`,
          { followedId: id },
          config
        )
        .then(() => {
          setButton(false);
          setFollowing(true);
        })
        .catch(() => {
          setButton(false);
          alert("Não foi possível completar a requisição");
        });
    }
  }

  console.log(following);

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
        {alertNewPosts && (
          <AlertNewPosts
            handleClick={includeNewPosts}
            number={newPosts.length}
          ></AlertNewPosts>
        )}
        {postList &&
          postList[0] !== "empty" &&
          postList.map((post) => {
            return <Post key={post.id} post={post} contador={contador} setContador={setContador}/>;
          })}
        {morePages && <LoadingMorePosts />}
      </Timeline>
      <SideBar
        mypage={myPage ? "none" : ""}
        color={following ? "#1877F2" : "#FFFFFF"}
        background={following ? "#FFFFFF" : "#1877F2"}
      >
        <button
          data-test="follow-btn"
          disabled={button}
          onClick={handleFollows}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
        <TrendingBoard></TrendingBoard>
      </SideBar>
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

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  button {
    display: ${(props) => props.mypage};
    margin-top: 69px;
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background: ${(props) => props.background};
    color: ${(props) => props.color};
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    &:hover {
      filter: brightness(0.9);
    }
    &:disabled {
      filter: brightness(0.8);
    }
  }
`;
