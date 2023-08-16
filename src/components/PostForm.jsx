import { styled } from "styled-components";

export default function PostForm() {
  return (
    <Container>
      <User>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          alt=""
        />
      </User>
      <Form>
        <p>What are you going to share today?</p>
        <Url placeholder="http://..." type="text" />
        <Description
          placeholder="Awesome article about #javascript"
          type="text"
        />
        <button>Publish</button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  flex-shrink: 0;
  margin-top: 43px;
  height: 209px;
  width: 100%;
  border-radius: 16px;
  background-color: white;
  display: flex;
  padding-right: 21px;
  margin-bottom: 13px;
`;

const User = styled.div`
  margin-top: 16px;
  margin-left: 18px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 27px;
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
  }
`;

const Url = styled.input`
  margin-top: 7px;
  height: 30px;
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
`;
