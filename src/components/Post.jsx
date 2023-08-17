import { styled } from "styled-components";
import LikeButton from "./LikeButton";

export default function Post({post}) {
  const {username, pictureUrl, description, data, url} = post
  return (
    <Container>
      <Info>
        <User>
          <img
            src={pictureUrl}
            alt=""
          />
        </User>
        <LikeButton />
      </Info>
      <Content>
        <UserName>{username}</UserName>
        <Text>
          {description}
        </Text>
        <PostUrl onClick={()=>{window.location.href = url;}}>
          <TextContainer>
            <Title>{data.title}</Title>
            <Description>
              {data.description}
            </Description>
            <Url>{url}</Url>
          </TextContainer>
          <img
            src={data.image}
            alt=""
          />
        </PostUrl>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 16px;
  border-radius: 16px;
  background: #171717;
  display: flex;
  padding-right: 21px;
  flex-shrink: 0;
  padding-bottom: 20px;
`;
const Info = styled.div`
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
  &:hover{
    cursor: pointer;
    filter: brightness(.8);
  }
  margin-top: 20px;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background: rgba(196, 196, 196, 0);
  height: 155px;
  position: relative;
  min-width: 503px;
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
