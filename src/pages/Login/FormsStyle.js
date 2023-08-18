import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Body = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;
export const Container = styled.div`
  width: 529px;
  padding: 0 52px;
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 429px;
    height: 416px;
  }

  input {
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    width: 100%;
    height: 65px;
    margin-bottom: 12px;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    padding-left: 15px;

    &::placeholder {
      color: #9f9f9f;
    }
  }

  button {
    width: 100%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    background-color: #1877f2;
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    font-weight: 700;
    text-align: center;
    color: #ffffff;
    margin-bottom: 20px;
  }

  @media (max-width: 950px) {
    width: 100%;
    justify-content: start;
    min-height: calc(100vh - 180px);
    padding: 40px 25px;

    form {
      width: 100%;
    }

    input,
    button {
      max-width: 500px;
      width: 100%;
      height: 55px;
      font-size: 22px;
    }
  }
`;

export const StyledLink = styled(Link)`
  font-family: "Lato", sans-serif;
  font-size: 20px;
  text-decoration: none;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 2px;
  width: fit-content;

  @media (max-width: 950px) {
    font-size: 17px;
  }
`;

export const Sidebar = styled.div`
  width: calc(100vw - 529px);
  height: 100vh;
  background-color: #151515;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding: 5%;
  div {
    width: 442px;
    height: 416px;
    h1 {
      font-family: "Passion One", sans-serif;
      font-size: 106px;
      font-weight: 700;
      letter-spacing: 5px;
    }
    span {
      font-family: "Oswald", sans-serif;
      font-size: 43px;
      line-height: 63.73px;
    }
  }

  @media (max-width: 950px) {
    width: 100vw;
    height: 180px;
    padding: 0;
    justify-content: center;

    div {
      width: 237px;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 76px;
      }

      span {
        font-size: 23px;
        line-height: 34px;
      }
    }
  }
`;
