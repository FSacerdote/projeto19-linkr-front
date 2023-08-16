import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [heart, setHeart] = useState(false);
  const heartAtual = heart ? <Heart /> : <HeartOutline />;
  /* TO-DO 
        - adicionar o context de autenticação
        - fazer requisição com a api
        - preciso saber como o componente Post irá ser criado 
    */

  function handleLike() {
    console.log(postId);
    setHeart(!heart);
    if (!heart) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }
  }

  return (
    <SCLikeButton>
      <button onClick={handleLike}>{heartAtual}</button>
      <LikeCount>
        {likes} <span>{likes === 1 ? "like" : "likes"}</span>
      </LikeCount>
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
