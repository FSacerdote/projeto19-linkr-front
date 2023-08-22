/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from "styled-components";
import Header from "../components/Header";
import Post from "../components/Post";
import TrendingBoard from "../components/TrendingBoard";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContextProvider from "../context/AuthContext";

export function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [following, setFollowing] = useState(false);
  const [button, setButton] = useState(true)

  const { config, userId } = useContext(DataContextProvider);
  const myPage = (Number(userId) === Number(id))

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
    axios.get(`${process.env.REACT_APP_API_URL}/follows/${id}`, config)
      .then((resposta)=>{
        setButton(false)
        setFollowing(resposta.data.follows)
      })
      .catch((erro)=>{console.log(erro)})
    getInfo();
  }, [id]);

  function handleFollows(){
    setButton(true)
    if(following){
      axios.delete(`${process.env.REACT_APP_API_URL}/follows/${id}`, config)
        .then(()=>{
          setButton(false)
          setFollowing(false)
        })
        .catch(()=>{
          alert("Não foi possível completar a requisição")
        })
    }else{
      axios.post(`${process.env.REACT_APP_API_URL}/follows`, {followedId: id}, config)
        .then(()=>{
          setButton(false)
          setFollowing(true)
        })
        .catch(()=>{
          alert("Não foi possível completar a requisição")
        })
    }
  }

  console.log(following)

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
            return <Post key={post.id} post={post} />;
          })}
      </Timeline>
      <SideBar mypage={myPage?"none":""} color={following?"#1877F2":"#FFFFFF"} background={following?"#FFFFFF":"#1877F2"}>
        <button disabled={button} onClick={handleFollows}>{following?"Unfollow":"Follow"}</button>
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
  button{
    display: ${(props)=>props.mypage};
    margin-top: 69px;
    width: 112px;
    height: 31px; 
    border-radius: 5px;
    background: ${(props)=>props.background};
    color: ${(props)=>props.color};
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    &:hover{
      filter: brightness(0.9);
    }
    &:disabled{
      filter: brightness(0.8);
    }
  }
`