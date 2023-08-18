/* eslint-disable no-lone-blocks */
import { useNavigate } from "react-router-dom";
import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

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
    if (
      formData.email === "" ||
      formData.username === "" ||
      formData.password === "" ||
      formData.pictureUrl === ""
    ) {
      return alert("Preencha os campos corretamente");
    }
    setIsDisable(true);

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/signup`,
      formData
    );

    promise.then(() => {
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
        console.log(error);
      }
      setIsDisable(false);
    });
  }

  return (
    <Body>
      <Sidebar>
        <div>
          <h1>linkr</h1>
          <span>save, share and discover the best links on the web</span>
        </div>
      </Sidebar>
      <Container>
        <form onSubmit={userRegister}>
          <input
            type="email"
            placeholder="e-mail"
            value={formData.email}
            onChange={handleChange}
            name="email"
            disabled={isDisable}
          />
          <input
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            disabled={isDisable}
          />
          <input
            type="text"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
            name="username"
            disabled={isDisable}
          />
          <input
            type="url"
            placeholder="picture url"
            value={formData.pictureUrl}
            onChange={handleChange}
            name="pictureUrl"
            disabled={isDisable}
          />
          <button type="submit" disabled={isDisable}>
            {isDisable ? (
              <ThreeDots height="13px" color="#ffffff" />
            ) : (
              "Sign Up"
            )}
          </button>
          <StyledLink to="/">Switch back to log in</StyledLink>
        </form>
      </Container>
    </Body>
  );
}
