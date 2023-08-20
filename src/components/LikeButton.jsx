/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import DataContextProvider from "../context/AuthContext";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [users, setUsers] = useState([]);
  const [heart, setHeart] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [loggedUser, setLoggedUser] = useState("nathan");

  const apiUrl = process.env.REACT_APP_API_URL;

  const { config } = useContext(DataContextProvider);

  const fetchLikesAndUsers = useCallback(() => {
    axios
      .get(`${apiUrl}/post/${postId}/likes`, config)
      .then((resp) => {
        setLikes(resp.data.likeCount);
        setUsers(resp.data.likedUsers.map((user) => user.username));
        setHeart(
          resp.data.likedUsers.some((user) => user.username === loggedUser)
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [apiUrl, loggedUser, postId]);

  useEffect(() => {
    fetchLikesAndUsers();
  }, [fetchLikesAndUsers]);

  const handleLike = () => {
    setHeart((prevHeart) => !prevHeart);

    if (heart) {
      axios
        .delete(`${apiUrl}/like/${postId}`, config)
        .then((resp) => {
          console.log(resp.data);
          fetchLikesAndUsers(); // Fetch atualizado após ação de like/deslike
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      axios
        .post(`${apiUrl}/like/${postId}`, null, config)
        .then((resp) => {
          console.log(resp.data);
          fetchLikesAndUsers(); // Fetch atualizado após ação de like/deslike
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const heartIcon = heart ? <Heart /> : <HeartOutline />;

  const tooltipContent = useMemo(() => {
    if (likes === 1) {
      return heart ? "Você curtiu" : `${users[0]} curtiu`;
    } else if (likes === 2) {
      return heart
        ? `Você e ${users[0]} curtiram`
        : `${users[0]} e ${users[1]} curtiram`;
    } else if (likes > 2) {
      const remaining = likes - 2;
      return heart
        ? `Você, ${users[0]} e outras ${remaining} pessoa${
            remaining !== 1 ? "s" : ""
          } curtiram`
        : `${users.slice(0, 2).join(", ")} e outras ${remaining} pessoa${
            remaining !== 1 ? "s" : ""
          } curtiram`;
    } else {
      return heart ? "Você curtiu" : "Ninguém curtiu ainda";
    }
  }, [heart, likes, users]);

  return (
    <>
      <SCLikeButton 
        data-tooltip-id="my-tooltip"
        data-tooltip-place="bottom"
        data-tooltip-content={tooltipContent}
        onClick={handleLike}
      >
        <button data-test="like-btn">{heartIcon}</button>
        <LikeCount data-test="counter">
          {likes} <span>{likes === 1 ? "like" : "likes"}</span>
        </LikeCount>
      </SCLikeButton>
      <Tooltip
        data-test="tooltip" 
        id="my-tooltip"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          color: "#222",
          borderRadius: "3px",
          zIndex: "1",
        }}
      />
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
