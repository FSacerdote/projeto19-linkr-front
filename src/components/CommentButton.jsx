/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { styled } from "styled-components";
import DataContextProvider from "../context/AuthContext";

export default function CommentButton({ postId, commentCount, follower }) {
  const [comments, setComments] = useState(parseInt(commentCount));

  return (
    <SCCommentButton>
      <CommentOutline />
      <CommentCount>
        {comments} <span>{comments === 1 ? "comment" : "comments"}</span>
      </CommentCount>
    </SCCommentButton>
  );
}
const SCCommentButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

const CommentOutline = styled(AiOutlineComment)`
  font-size: 20px;
  color: #fff;
`;
const CommentCount = styled.p`
  font-size: 11px;
  display: flex;
  gap: 3px;
`;
