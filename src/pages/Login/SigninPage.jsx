/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
import { useContext, useState, useEffect } from "react";
import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
import DataContextProvider from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SigninPage() {
  const { setToken, setConfig, setPicture, setUserId } =
    useContext(DataContextProvider);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function loginToAccont(e) {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      return alert("Preencha os campos corretamente");
    }
    setIsDisable(true);

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/signin`,
      formData
    );

    promise.then((res) => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("picture", res.data.pictureUrl);
      localStorage.setItem("userId", res.data.userId);
      setUserId(res.data.userId);
      setToken(res.data.token);
      setPicture(res.data.pictureUrl);
      setIsDisable(false);
      setConfig({ headers: { authorization: `Bearer ${res.data.token}` } });
      navigate("/timeline");
    });
    promise.catch((res) => {
      console.log(res);
      if (res.response.status === 401) {
        alert(`Senha ou e-mail inconrretos, por favor tente novamente.`);
      } else {
        alert(res.response.data);
      }
      setIsDisable(false);
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const picture = localStorage.getItem("picture");
    const userId = parseInt(localStorage.getItem("userId"));

    if (token && picture && userId) {
      setToken(token);
      setPicture(picture);
      setUserId(userId);
      setConfig({ headers: { authorization: `Bearer ${token}` } });
      navigate("/timeline");
    }
  }, []);

  return (
    <Body>
      <Sidebar>
        <div>
          <h1>linkr</h1>
          <span>save, share and discover the best links on the web</span>
        </div>
      </Sidebar>

      <Container>
        <form onSubmit={loginToAccont}>
          <input
            data-test="email"
            type="email"
            placeholder="e-mail"
            value={formData.email}
            onChange={handleChange}
            name="email"
            disabled={isDisable}
          />
          <input
            data-test="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            disabled={isDisable}
          />

          <button data-test="login-btn" type="submit" disabled={isDisable}>
            {isDisable ? <ThreeDots height="13px" color="#ffffff" /> : "Log In"}
          </button>
          <StyledLink data-test="sign-up-link" to="/sign-up">
            First time? Create an account!
          </StyledLink>
        </form>
      </Container>
    </Body>
  );
}
