import { styled } from "styled-components";

import { BsSend } from "react-icons/bs";

export default function CommentField() {
  return (
    <>
      <UserComment>
        <Avatar
          src="https://i.pinimg.com/736x/d4/3c/c5/d43cc5c59932cbc99b5ed778b7a67eea.jpg"
          alt="steven"
        ></Avatar>
        <WriteField></WriteField>
        <BsSend />
      </UserComment>
    </>
  );
}

const WriteField = styled.input`
  border-radius: 8px;
  background: #252525;
  height: 39px;
  border: none;
  width: 510px;
`;

const UserComment = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 39px;
  height: 39px;
  object-fit: cover;
  border-radius: 50%;
`;
