/* eslint-disable no-lone-blocks */
import { useNavigate } from "react-router-dom";
import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
import axios from "axios";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    pictureUrl: "",
  });

  function handleChange(e) {
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function userRegister(e) {
    e.preventDefault();
    setIsDisable(true);

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      formData
    );

    promise.then(() => {
      alert("Cadastrado com sucesso!");
      setIsDisable(false);
      navigate("/");
    });
    promise.catch((error) => {
      if (error.response && error.response.status === 409) {
        alert(
          `${error.response.data} Error ${error.response.status}: ${error.response.statusText}`
        );
      } else {
        alert(error.message);
      }
      setIsDisable(false);
    });
  }

  return (
    <Body>
      <Sidebar>
        <div>
          <h1>linkr</h1>
          <span>save, share and sicover the best links on the web</span>
        </div>
      </Sidebar>
      <Container>
        <label>
          <form onSubmit={userRegister}>
            <input
              type="email"
              placeholder="e-mail"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
              disabled={isDisable}
            />
            <input
              type="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              required
              disabled={isDisable}
            />
            <input
              type="text"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              name="username"
              required
              disabled={isDisable}
            />
            <input
              type="url"
              placeholder="picture url"
              value={formData.pictureUrl}
              onChange={handleChange}
              name="pictureUrl"
              required
              disabled={isDisable}
            />
            <button type="submit" disabled={isDisable}>
              Sign Up
            </button>
          </form>
        </label>

        <StyledLink to="/">Switch back to log in</StyledLink>
      </Container>
    </Body>
  );
}
