import { styled } from "styled-components";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

export default function Post({ post }) {
  const { id, userId, username, pictureUrl, description, data, url } = post;
  const navigate = useNavigate();
  return (
    <Container>
      <Info>
        <User>
          <img
            onClick={() => {
              navigate(`/user/${userId}`);
            }}
            src={pictureUrl}
            alt=""
          />
        </User>
        <LikeButton postId={id} />
      </Info>
      <Content>
        <Top>
          <UserName>{username}</UserName>
          <Buttons>
            <EditPost />
            <DeletePost />
          </Buttons>
        </Top>

        <Text>{description}</Text>
        <PostUrl
          onClick={() => {
            window.location.href = url;
          }}
        >
          <TextContainer>
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
            <Url>{url}</Url>
          </TextContainer>
          <img src={data.image} alt="" />
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
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;
const User = styled.div`
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
  }
  img:hover {
    cursor: pointer;
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
  color: #fff;
  font-size: 19px;
`;

const Text = styled.p`
  margin-top: 7px;
  color: #b7b7b7;
  font-size: 17px;
`;

const PostUrl = styled.div`
  &:hover {
    cursor: pointer;
    filter: brightness(0.8);
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
    width: 155px;
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
