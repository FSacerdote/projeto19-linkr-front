import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Body = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const Container = styled.div`
  width: 30%;
  min-height: 100vh;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 60px 0 px;
  }

  input {
    width: 20vw;
    height: 60px;
    margin-bottom: 9px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    color: #9f9f9f;
    font-weight: 700;
    font-size: 20px;
  }

  button {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 5px;
    background-color: #1877f2;

    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 9px;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 15px;
  line-height: 17px;
  text-decoration: none;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
  padding-bottom: 2px;
`;

export const Sidebar = styled.div`
  width: 75%;
  height: 100vh;
  background-color: #151515;
  display: flex;
  align-items: center;
  color: #ffffff;
  padding-left: 100px;
  div {
    width: 300px;
    h1 {
      font-size: 96px;
      font-weight: 900;
    }
    span {
      font-size: 26px;
    }
  }
`;
