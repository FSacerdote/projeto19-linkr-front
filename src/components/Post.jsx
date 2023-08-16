import { styled } from "styled-components";
import LikeButton from "./LikeButton";

export default function Post() {
  return (
    <Container>
      <Info>
        <User>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt=""
          />
        </User>
        <LikeButton />
      </Info>
      <Content>
        <UserName>Juvenal Juvêncio</UserName>
        <Text>
          Muito maneiro esse tutorial de Material UI com React, deem uma olhada!
        </Text>
        <PostUrl>
          <TextContainer>
            <Title>Como aplicar o Material UI em um projeto React</Title>
            <Description>
              Hey! I have moved this tutorial to my personal blog. Same content,
              new location. Sorry about making you click through to another
              page.
            </Description>
            <Url>https://medium.com/@pshrmn/a-simple-react-router</Url>
          </TextContainer>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
            alt=""
          />
        </PostUrl>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 16px;
  height: 276px;
  border-radius: 16px;
  background: #171717;
  display: flex;
  padding-right: 21px;
  flex-shrink: 0;
  padding-bottom: 20px;
`;
const Info = styled.p`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  padding-left: 18px;
  gap: 19px;
`;

const User = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
  }
`;

const Content = styled.div`
  margin-left: 18px;
  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }
`;

const UserName = styled.p`
  margin-top: 19px;
  color: #fff;
  font-size: 19px;
`;

const Text = styled.p`
  margin-top: 7px;
  color: #b7b7b7;
  font-size: 17px;
`;

const PostUrl = styled.div`
  margin-top: 20px;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background: rgba(196, 196, 196, 0);
  height: 155px;
  position: relative;
  img {
    border-radius: 0 11px 11px 0;
    right: 0;
    position: absolute;
    height: 100%;
    top: 0;
  }
`;

const TextContainer = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    line-height: normal;
  }
`;

const Title = styled.p`
  height: 38px;
  margin-top: 24px;
  width: 250px;
  color: #cecece;
  font-size: 16px;
`;

const Url = styled.p`
  margin-top: 13px;
  width: 300px;
  color: #cecece;
  font-size: 11px;
`;

const Description = styled.p`
  height: 39px;
  margin-top: 5px;
  width: 260px;
  color: #9b9595;
  font-size: 11px;
`;
