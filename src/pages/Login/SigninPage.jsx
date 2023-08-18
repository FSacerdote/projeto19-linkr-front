import { useContext, useState } from "react";
import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
import DataContextProvider from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SigninPage(){
  const {setToken, setConfig, setPicture} = useContext(DataContextProvider)
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  

  function handleChange(e) {
    {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  }

  function loginToAccont(e){
    e.preventDefault();
    setIsDisable(true);

    const promise = axios.post(
      `${process.env.REACT_APP_API_URL}/signin`,
      formData
    );

    promise.then((res) => {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("picture", res.data.pictureUrl)
      setToken(res.data.token)
      setPicture(res.data.pictureUrl)
      setIsDisable(false);
      setConfig({headers:{authorization:`Bearer ${res.data.token}`}})
      navigate("/timeline");
    });
    promise.catch((res) => {
      console.log(res);
      if (res.response.status === 401) {
        alert(
          `Senha ou e-mail inconrretos, por favor tente novamente.`
        );
      }else{
        alert(res.response.data)
      }
      setIsDisable(false);
    });
  }
  
  return(
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
       
      <button type="submit" disabled={isDisable}>{isDisable ? <ThreeDots height="13px" color="#ffffff" /> : "Log In"}</button>
      <StyledLink to="/signup">First time? Create an account!</StyledLink>
      </form>
    </Container>
    </Body>
      
  )
}
