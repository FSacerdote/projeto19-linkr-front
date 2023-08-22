import { styled } from "styled-components";

import { BsSend } from "react-icons/bs";
import { useContext, useState } from "react";
import DataContextProvider from "../context/AuthContext";
import axios from "axios";

export default function CommentField({ postId }) {
  const [text, setText] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const { config, picture } = useContext(DataContextProvider);

  function handleSubmitComment() {
    const body = {
      text,
    };
    console.log(body);

    axios
      .post(`${apiUrl}/post/${postId}/comment`, body, config)
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.response.message));

    setText("");
  }

  return (
    <>
      <UserComment>
        <Avatar src={picture} alt="picture"></Avatar>
        <WriteField
          placeholder="write a comment..."
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          name="text"
        ></WriteField>
        <SendButton onClick={handleSubmitComment} />
      </UserComment>
    </>
  );
}

const SendButton = styled(BsSend)`
  position: relative;
  cursor: pointer;
`;

const WriteField = styled.input`
  border-radius: 8px;
  background: #252525;
  height: 39px;
  border: none;
  width: 510px;
  margin-right: -50px;

  color: #575757;
  padding: 15px;
  font-style: italic;

  letter-spacing: 0.7px;
`;

const UserComment = styled.div`
  padding-top: 15px;
  display: flex;
  gap: 14px;
  align-items: center;
  color: #fff;
`;

const Avatar = styled.img`
  width: 39px;
  height: 39px;
  object-fit: cover;
  border-radius: 50%;
`;
