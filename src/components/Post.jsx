import { styled } from "styled-components";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import { PiPencilFill } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Post({ post }) {
  const { id, userId, username, pictureUrl, description, data, url } = post;
  const [editedText, setEditedText] = useState(description);
  const [editModeText, setEditModeText] = useState(editedText);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjkyMTkzOTQ5LCJleHAiOjE2OTQ3ODU5NDl9.VhckFht3sYXQTaqy2LHE3Vga6rZFygqH9tw8AKTR8Xc";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const editFieldRef = useRef();

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleEdit() {
    console.log("Editando");
    if (isEditing) {
      setEditedText(editModeText);
      setIsEditing(false);
    } else {
      setEditModeText(editedText);
    }
    setIsEditing(!isEditing);
  }

  function handleInputChange(e) {
    const input = e.target.value;

    setEditedText(input);

    console.log("Texto está mudando");
  }

  function handleInputBlur() {
    setIsEditing(false);
    if (!isEditing) {
      setEditedText(description); // Define o valor original ao cancelar a edição
    }
  }

  function handleDelete() {
    console.log("Deletando");
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      setLoading(true);
      const editedPost = {
        url,
        description: editedText,
      };
      console.log(editedPost);

      //requisição
      axios
        .put(`${apiUrl}/posts/edit/${id}`, editedPost, config)
        .then((resp) => {
          console.log(resp.data);
          setEditedText(resp.data.description);
        })
        .catch((err) => {
          setEditedText(editModeText);
          setIsEditing(false);
          alert("Erro ao atualizar o post");
        });

      setLoading(false);
      setIsEditing(false);
    } else if (event.key === "Escape") {
      setEditedText(description);
      setIsEditing(false);
    }
  }

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
      editFieldRef.current.selectionStart = editFieldRef.current.value.length;
      editFieldRef.current.selectionEnd = editFieldRef.current.value.length;
    }
  }, [isEditing]);

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
            <EditIcon onClick={handleEdit} />
            <DeleteIcon onClick={handleDelete} />
          </Buttons>
        </Top>
        {isEditing ? (
          <EditingPost
            ref={editFieldRef}
            type="text"
            value={editedText}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
        ) : (
          <Text>{editedText}</Text>
        )}

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

const EditIcon = styled(PiPencilFill)`
  font-size: 20px;
  cursor: pointer;
  color: #fff;
`;

const DeleteIcon = styled(AiFillDelete)`
  font-size: 20px;
  display: flex;
  cursor: pointer;
  color: #fff;
`;

const EditingPost = styled.textarea`
  margin-top: 15px;
  margin-bottom: 10px;
  color: #4c4c4c;
  font-family: Lato;
  font-size: 17px;
  border: none;
  border-radius: 7px;
  resize: none;
  &:focus {
    outline: none;
  }
`;
