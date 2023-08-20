/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import { styled } from "styled-components";
import DataContextProvider from "../context/AuthContext";

export default function LikeButton({ postId, likeCount, likedUsers }) {
  const [likes, setLikes] = useState(parseInt(likeCount));
  const [users, setUsers] = useState(likedUsers);
  const [heart, setHeart] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [loggedUser, setLoggedUser] = useState("nathan");
  const [isDisabled, setIsDisabled] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const { config, userId } = useContext(DataContextProvider);

  const fetchLikesAndUsers = useCallback(() => {
    setIsDisabled(true);
    axios
      .get(`${apiUrl}/post/${postId}/likes`, config)
      .then((resp) => {
        setIsDisabled(false);
        setLikes(parseInt(resp.data.likeCount));
        const filteredUsers = resp.data.likedUsers.filter(user => user.userId !== userId);
        const usernames = filteredUsers.map(user => user.username);
        setUsers(usernames);
        setHeart(
          resp.data.likedUsers.some((user) => user.userId === userId)
        );
      })
      .catch((err) => {
        setIsDisabled(false);
        console.log(err.response);
      });
  }, [apiUrl, loggedUser, postId]);
  
  const handleLike = () => {
    setHeart((prevHeart) => !prevHeart);
    setIsDisabled(true);

    if (heart) {
      axios
        .delete(`${apiUrl}/like/${postId}`, config)
        .then((resp) => {
          console.log(resp.data);
          setIsDisabled(false);
          fetchLikesAndUsers(); // Fetch atualizado após ação de like/deslike
        })
        .catch((err) => {
          console.log(err.response);
          setIsDisabled(false);
        });
    } else {
      axios
        .post(`${apiUrl}/like/${postId}`, null, config)
        .then((resp) => {
          console.log(resp.data);
          setIsDisabled(false);
          fetchLikesAndUsers(); // Fetch atualizado após ação de like/deslike
        })
        .catch((err) => {
          setIsDisabled(false);
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
    }  
    else if (likes > 2) {
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
  }, [likes, users]);

  useEffect(() => {
    const userLiked = likedUsers.some(user => user.userId === userId);
    setHeart(userLiked);
    const filteredUsers = likedUsers.filter(user => user.userId !== userId);
    const usernames = filteredUsers.map(user => user.username);
    setUsers(usernames);
  }, [])

  return (
    <>
      <SCLikeButton 
        data-tooltip-id="my-tooltip"
        data-tooltip-place="bottom"
        data-tooltip-content={tooltipContent}
        onClick={handleLike}
        disabled={isDisabled}
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
