/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";
import { Tooltip } from "react-tooltip";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [users, setUsers] = useState([]);
  const [heart, setHeart] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const heartAtual = heart ? <Heart /> : <HeartOutline />;

  //const [token] = useContext();

  const apiUrl = process.env.REACT_APP_API_URL;
  /* TO-DO 
        - adicionar o context de autenticação
        - fazer requisição com a api
        - preciso saber como o componente Post irá ser criado 
    */
  function createTooltip() {
    const likedByCurrentUser = heart;
    const currentUser = users[0];
    const firstOtherUser = users[1];
    const remainingUsers = Math.max(likes - 2, 0);

    let tooltipContent = "";

    if (likedByCurrentUser) {
      if (likes === 1) {
        tooltipContent = "Você curtiu";
      } else if (likes === 2) {
        tooltipContent = `Você e ${firstOtherUser} curtiram`;
      } else if (remainingUsers === 0) {
        tooltipContent = "Você e outras pessoas curtiram";
      } else {
        tooltipContent = `Você, ${firstOtherUser} e outras ${remainingUsers} pessoa${
          remainingUsers !== 1 ? "s" : ""
        }`;
      }
    } else {
      if (likes === 1) {
        tooltipContent = `${currentUser} curtiu`;
      } else if (likes === 2) {
        tooltipContent = `${currentUser} e ${firstOtherUser} curtiram`;
      } else if (remainingUsers === 0) {
        tooltipContent = "Ninguém curtiu ainda";
      } else {
        tooltipContent = `${currentUser}, ${firstOtherUser} e outras ${remainingUsers} pessoa${
          remainingUsers !== 1 ? "s" : ""
        }`;
      }
    }
    setTooltip(tooltipContent);
  }

  useEffect(() => {
    createTooltip();
  });

  /*  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkyMTkzOTQ5LCJleHAiOjE2OTQ3ODU5NDl9.VhckFht3sYXQTaqy2LHE3Vga6rZFygqH9tw8AKTR8Xc`,
      },
    };
    axios.get(`${apiUrl}/post/${postId}/likes`, config).then((resp) => {
      console.log(resp.data);
      setLikes(resp.data.likeCount);
      setUsers(resp.data.likedUsers)
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
      setUsers(["Você"]);
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
      setUsers([]);
      setLikes(likes - 1);
    }
  }

  /* function handleMouseEnter() {
    console.log(heart);
    console.log(likes);
    console.log(users);
    if (heart) {
      if (likes >= 2) {
        // Caso tenha mais de 1 curtida
        const others = likes - 2;
        const additionalPerson = likes === 2 ? `Você e ${users[1]}` : users[1];
        return `Você, ${additionalPerson} e outras ${others} pessoa${
          others > 1 ? "s" : ""
        }`;
      } else {
        // Caso tenha apenas 1 curtida
        return "Você curtiu";
      }
    } else if (!heart) {
      if (likes >= 2) {
        // Caso tenha mais de 1 curtida
        const others = likes - 2;
        const additionalPerson = `${users[0]}, ${users[1]}`;
        return `${additionalPerson} e outras ${others} pessoa${
          others > 1 ? "s" : ""
        }`;
      } else if (likes === 1) {
        // Caso tenha apenas 1 curtida
        return `${users[0]} curtiu`;
      }
    }
  } */

  return (
    <>
      <SCLikeButton
        data-tooltip-id="my-tooltip"
        data-tooltip-place="bottom"
        data-tooltip-content={tooltip}
        onClick={handleLike}
      >
        <button>{heartAtual}</button>
        <LikeCount>
          {likes} <span>{likes === 1 ? "like" : "likes"}</span>
        </LikeCount>
      </SCLikeButton>
      <Tooltip id="my-tooltip" />
    </>
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
