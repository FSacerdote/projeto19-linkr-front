import { styled } from "styled-components";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import { PiPencilFill } from "react-icons/pi";
import { AiFillDelete } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import { BsSend } from "react-icons/bs";
import Modal from "react-modal";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Tagify } from "react-tagify";
import DataContextProvider from "../context/AuthContext";
import CommentButton from "./CommentButton";
import Comments from "./Comments";

Modal.setAppElement("#root");

export default function Post({ post, contador, setContador }) {
  const {
    id,
    userId,
    username,
    pictureUrl,
    description,
    data,
    url,
    likeCount,
    likedUsers,
    commentCount,
  } = post;
  const [editedText, setEditedText] = useState(description);
  const [editModeText, setEditModeText] = useState(editedText);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const { config, picture } = useContext(DataContextProvider);
  const userSessionId = useContext(DataContextProvider).userId;

  const isOwner = userId === userSessionId;

  const editFieldRef = useRef();

  const apiUrl = process.env.REACT_APP_API_URL;

  function handleEdit() {
    setEditModeText(editedText);
    setIsEditing(true);
  }

  function handleInputChange(e) {
    const input = e.target.value;

    setEditedText(input);

    console.log("Texto está mudando");
  }

  function handleInputBlur() {
    setTimeout(() => {
      setIsEditing(false);
      setEditedText(editModeText);
    }, 100);
  }

  async function handleKeyDown(event) {
    if (event.key === "Enter") {
      setLoading(true);

      const editPostForm = {
        url,
        description: editedText,
      };

      axios
        .put(`${apiUrl}/posts/edit/${id}`, editPostForm, config)
        .then((resp) => {
          console.log(resp.data);
          setEditedText(editedText);
          setLoading(false);
          setIsEditing(false);
        })
        .catch((err) => {
          setEditedText(editModeText);
          setIsEditing(false);
          alert("Erro ao atualizar o post");
        });
    } else if (event.key === "Escape") {
      setIsEditing(false);
      setEditedText(description);
    }
  }

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current.focus();
      editFieldRef.current.selectionStart = editFieldRef.current.value.length;
      editFieldRef.current.selectionEnd = editFieldRef.current.value.length;
    }
  }, [isEditing]);

  function handleDeleteConfirm() {
    console.log("Deletando");
    axios
      .delete(`${apiUrl}/posts/delete/${id}`, config)
      .then((resp) => {
        console.log(resp.data);
        setContador(contador - 1);
        setDeleteModalOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setDeleteModalOpen(false);
      });
  }
  function openDeleteModal() {
    setDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setDeleteModalOpen(false);
  }

  async function handleCommentButton() {
    setIsCommenting(!isCommenting);

    try {
      const response = await axios.get(`${apiUrl}/post/${id}/comments`, config);
      setComments(response.data);
    } catch (error) {
      console.log(error.response.message);
    }
  }

  useEffect(() => {
    axios
      .get(`${apiUrl}/post/${id}/comments`, config)
      .then((resp) => {
        setComments(resp.data);
      })
      .catch((err) => console.log(err.response.message));
  }, [apiUrl, comments, config, id]);

  const [text, setText] = useState("");

  function handleSubmitComment() {
    const body = {
      text,
    };
    console.log(body);

    axios
      .post(`${apiUrl}/post/${id}/comment`, body, config)
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err.response.message));

    setText("");

    axios
      .get(`${apiUrl}/post/${id}/comments`, config)
      .then((resp) => setComments(resp.data))
      .catch((error) => console.log(error.response.message));
  }

  return (
    <Container data-test="post">
      <PostContainer>
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
          <LikeButton
            postId={id}
            likeCount={likeCount}
            likedUsers={likedUsers}
          />
          <button onClick={handleCommentButton}>
            <CommentButton postId={id} commentCount={commentCount} />
          </button>
        </Info>
        <Content>
          <Top>
            <UserName
              data-test="username"
              onClick={() => {
                navigate(`/user/${userId}`);
              }}
            >
              {username}
            </UserName>
            {isOwner && (
              <Buttons>
                <EditIcon data-test="edit-btn" onClick={handleEdit} />
                <DeleteIcon data-test="delete-btn" onClick={openDeleteModal} />
              </Buttons>
            )}
          </Top>
          {isEditing && !loading ? (
            <EditingPost
              data-test="edit-input"
              ref={editFieldRef}
              type="text"
              value={editedText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
            />
          ) : loading ? (
            <ThreeDots
              height="19"
              width="30"
              radius="9"
              color="#b7b7b7"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            <Tagify
              onClick={(text) => navigate(`/hashtag/${text}`)}
              tagStyle={{
                color: "#ffffff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Text data-test="description">
                {loading ? (
                  <ThreeDots
                    height="19"
                    width="30"
                    radius="9"
                    color="#b7b7b7"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                ) : (
                  editedText
                )}
              </Text>
            </Tagify>
          )}

          <PostUrl target="_blank" href={url} data-test="link">
            <TextContainer>
              <Title>{data.title}</Title>
              <Description>{data.description}</Description>
              <Url>{url}</Url>
            </TextContainer>
            <img src={data.image} alt="" />
          </PostUrl>
        </Content>
      </PostContainer>
      {isCommenting && (
        <CommentSection>
          {comments.map((comment) => (
            <Comments
              key={comment.id}
              name={comment.username}
              text={comment.text}
              pictureUrl={comment.pictureUrl}
              postOwner={username}
              userId={comment.userId}
            />
          ))}

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
        </CommentSection>
      )}

      {isDeleteModalOpen && <BackgroundOverlay />}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Modal"
        overlayClassName="custom-overlay"
      >
        <DeleteOptions>
          <p>
            Are you sure you want
            <br />
            to delete this post?
          </p>
          <div>
            <CancelDelete data-test="cancel" onClick={closeDeleteModal}>
              No, go back
            </CancelDelete>
            <ConfirmDelete data-test="confirm" onClick={handleDeleteConfirm}>
              Yes, delete it
            </ConfirmDelete>
          </div>
        </DeleteOptions>
      </DeleteModal>
    </Container>
  );
}

const CommentSection = styled.div`
  border-radius: 16px;

  background: #1e1e1e;
  width: inherit;
  height: inherit;
  flex-shrink: 0;
  margin-top: -74px;
  padding: 50px 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 44px;
`;

const PostContainer = styled.div`
  margin-top: 16px;
  z-index: 1;
  border-radius: 16px;
  background: #171717;
  display: flex;
  padding-right: 21px;
  flex-shrink: 0;
  padding-bottom: 20px;
  @media (max-width: 1000px) {
    border-radius: 0;
    width: 100%;
    justify-content: center;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  padding-top: 16px;
  padding-left: 5px;
  gap: 19px;
  @media (max-width: 1000px) {
    padding-left: 15px;
  }
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
  @media (max-width: 1000px) {
    img {
      width: 40px;
      height: 40px;
    }
  }
`;

const Content = styled.div`
  margin-left: 18px;
  padding-right: 21px;

  p {
    font-family: "Lato", sans-serif;
    font-weight: 400;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const UserName = styled.p`
  color: #fff;
  font-size: 19px;
  @media (max-width: 1000px) {
    font-size: 17px;
  }
`;

const Text = styled.p`
  margin-top: 7px;
  color: #b7b7b7;
  font-size: 17px;
  @media (max-width: 1000px) {
    font-size: 15px;
  }
`;

const PostUrl = styled.a`
  &:hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
  display: block;
  margin-top: 20px;
  border-radius: 11px;
  border: 1px solid #4d4d4d;
  background: rgba(196, 196, 196, 0);
  height: 155px;
  position: relative;
  min-width: 503px;
  text-decoration: none;
  img {
    border-radius: 0 11px 11px 0;
    right: 0;
    position: absolute;
    height: 155px;
    width: 155px;
    top: 0;
  }
  @media (max-width: 1000px) {
    height: 115px;
    min-width: 0;
    width: 100%;
    img {
      width: 85px;
    }
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
  width: 260px;
  color: #cecece;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1000px) {
    height: 26px;
    margin-top: 7px;
    width: 165px;
    font-size: 11px;
  }
`;

const Url = styled.p`
  margin-top: 13px;
  width: 260px;
  color: #cecece;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 1000px) {
    margin-top: 8px;
    width: 165px;
    font-size: 9px;
  }
`;

const Description = styled.p`
  height: 39px;
  margin-top: 5px;
  width: 300px;
  color: #9b9595;
  font-size: 11px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1000px) {
    margin-top: 4px;
    height: 44px;
    width: 165px;
    font-size: 9px;
  }
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
  width: 100%;
  &:focus {
    outline: none;
  }
`;
const DeleteModal = styled(Modal)``;
const DeleteOptions = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: #333;
  border-radius: 50px;
  width: 597px;
  height: 262px;
  color: #fff;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  button {
    border: none;
    border-radius: 4px;
    width: 134px;
    height: 37px;
    cursor: pointer;
    margin: 13px;
    font-family: Lato;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const CancelDelete = styled.button`
  background-color: #ffffff;
  color: #1877f2;
`;

const ConfirmDelete = styled.button`
  background-color: #1877f2;
  color: #ffffff;
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
`;
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
