import axios from "axios";
import { useContext, useState } from "react";
import { styled } from "styled-components";
import DataContextProvider from "../context/AuthContext";

export default function PostForm({ contador, setContador }) {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [habilitado, setHabilitado] = useState(false);

  const { config, picture } = useContext(DataContextProvider);

  function newPost(event) {
    event.preventDefault();
    setHabilitado(true);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/posts`,
        { url, description },
        config
      )
      .then(() => {
        setHabilitado(false);
        setDescription("");
        setUrl("");
        setContador(contador + 1);
      })
      .catch(() => {
        alert("There was an error publishing your link");
        setHabilitado(false);
      });
  }

  return (
    <Container data-test="publish-box">
      <User>
        <img
          src={picture}
          alt=""
        />
      </User>
      <Form onSubmit={newPost}>
        <p>What are you going to share today?</p>
        <Url 
          data-test="link"
          placeholder="http://..."
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={habilitado}
          required
        />
        <Description
          data-test="description"
          placeholder="Awesome article about #javascript"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={habilitado}
        />
        <button data-test="publish-btn" type="submit" disabled={habilitado}>
          {!habilitado ? "Publish" : "Publishing..."}
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); 
  flex-shrink: 0;
  margin-top: 43px;
  height: 209px;
  width: 100%;
  border-radius: 16px;
  background-color: white;
  display: flex;
  padding-right: 21px;
  margin-bottom: 13px;
  @media (max-width: 1000px) {
    justify-content: center;
    border-radius: 0;
    margin-top: 20px;
    height: 164px;
    margin-bottom: 0;
    padding-right: 0;
  }
`;

const User = styled.div`
  margin-top: 16px;
  margin-left: 18px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Form = styled.form`
  position: relative;
  margin-top: 21px;
  margin-left: 18px;
  display: flex;
  flex-direction: column;
  p {
    color: #707070;
    font-family: "Lato", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    text-align: center;
  }
  input {
    width: 503px;
    background-color: #efefef;
    border: none;
    border-radius: 5px;
    font-family: "Lato", sans-serif;
    font-size: 15px;
    font-weight: 300;
    padding-left: 12px;
  }
  button {
    width: 122px;
    height: 31px;
    position: absolute;
    bottom: 16px;
    right: 0;
    background: #1877f2;
    border: none;
    border-radius: 5px;
    color: white;
    font-family: "Lato", sans-serif;
    font-size: 14px;
    font-weight: 700;
    &:disabled {
      filter: brightness(0.8);
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
    margin-top: 10px;
    align-items: center;
    margin-left: 0;
    p{
      font-size: 17px;
    }
    input{
      font-size: 13px;
      width: 95%;
    }
    button{
      font-size: 13px;
      height: 22px;
      bottom: 12px;
      right: 2.5%;
    }
  }
`;

const Url = styled.input`
  margin-top: 7px;
  height: 30px;
  &:disabled {
    filter: brightness(0.9);
  }
`;

const Description = styled.textarea`
  margin-top: 5px;
  height: 66px;
  background-color: #efefef;
  border: none;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  font-size: 15px;
  font-weight: 300;
  padding-left: 12px;
  padding-top: 8px;
  resize: none;
  &:disabled {
    filter: brightness(0.9);
  }
  @media (max-width: 1000px) {
    height: 47px;
    font-size: 13px;
    width: 95%;
  }
`;
