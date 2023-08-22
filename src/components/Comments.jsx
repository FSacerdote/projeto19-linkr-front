import { styled } from "styled-components";

import { BsSend } from "react-icons/bs";

export default function Comments() {
  return (
    <>
      <SCComments>
        <Avatar
          src="https://i.pinimg.com/736x/d4/3c/c5/d43cc5c59932cbc99b5ed778b7a67eea.jpg"
          alt="steven"
        ></Avatar>
        <Info>
          <p>
            <Name>Nome</Name>
            <UserInfo> - following</UserInfo>
          </p>
          <Text>Texto do comentário</Text>
        </Info>
      </SCComments>
      <Line />
    </>
  );
}

const Line = styled.div`
  border: 1px solid #353535;
  margin: 19px 0px 15px 0;
`;

const Text = styled.p`
  color: #acacac;
`;

const UserInfo = styled.span`
  color: #565656;
`;

const Name = styled.span`
  color: #f3f3f3;
`;

const SCComments = styled.div`
  font-size: 14px;
  display: flex;
  color: #fff;
  gap: 18px;
  padding-top: 23px;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const Avatar = styled.img`
  width: 39px;
  height: 39px;
  object-fit: cover;
  border-radius: 50%;
`;
