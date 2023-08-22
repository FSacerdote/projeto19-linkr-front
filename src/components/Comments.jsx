import { styled } from "styled-components";

export default function Comments({ name, text, pictureUrl, postOwner }) {
  return (
    <>
      <SCComments>
        <Avatar src={pictureUrl} alt="pictureUrl"></Avatar>
        <Info>
          <p>
            <Name>{name}</Name>
            <UserInfo>{name === postOwner ? " • post’s author" : ""}</UserInfo>
          </p>
          <Text>{text}</Text>
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
