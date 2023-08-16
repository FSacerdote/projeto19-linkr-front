/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";
import { Tooltip } from "react-tooltip";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [heart, setHeart] = useState(false);
  const heartAtual = heart ? <Heart /> : <HeartOutline />;
  //const [token] = useContext();

  const apiUrl = process.env.REACT_APP_API_URL;
  /* TO-DO 
        - adicionar o context de autenticação
        - fazer requisição com a api
        - preciso saber como o componente Post irá ser criado 
    */
  /*  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkyMTkzOTQ5LCJleHAiOjE2OTQ3ODU5NDl9.VhckFht3sYXQTaqy2LHE3Vga6rZFygqH9tw8AKTR8Xc`,
      },
    };
    axios.get(`${apiUrl}/post/${postId}/likes`, config).then((resp) => {
      console.log(resp.data);
      setLikes(resp.data);
    }); 
  }, [apiUrl, postId]); */

  function handleLike() {
    console.log(postId);
    /* const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkyMTkzOTQ5LCJleHAiOjE2OTQ3ODU5NDl9.VhckFht3sYXQTaqy2LHE3Vga6rZFygqH9tw8AKTR8Xc`,
      },
    }; */
    setHeart(!heart);
    if (!heart) {
      // TO-DO substituir com o token do use Context

      /* axios
        .post(`${apiUrl}/like/${postId}`, config)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err.response);
        }); */
      setLikes(likes + 1);
    } else {
      /*
      axios
        .delete(`${apiUrl}/like/${postId}`, config)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err.response);
        }); */
      setLikes(likes - 1);
    }
  }

  return (
    <SCLikeButton>
      <button onClick={handleLike}>{heartAtual}</button>
      <LikeCount>
        {likes} <span>{likes === 1 ? "like" : "likes"}</span>
      </LikeCount>
      <Tooltip
        id="my-tooltip-1"
        place="bottom"
        content="Hello world! I'm a Tooltip"
      />
    </SCLikeButton>
  );
}

const SCLikeButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const HeartOutline = styled(AiOutlineHeart)`
  font-size: 20px;
  color: #fff;
`;
const Heart = styled(AiFillHeart)`
  font-size: 20px;
  color: #ac0000;
`;
const LikeCount = styled.p`
  font-size: 11px;
`;
