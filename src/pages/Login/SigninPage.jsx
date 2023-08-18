import { useContext, useState } from "react";
import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
import DataContextProvider from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SigninPage(){
  const {setToken} = useContext(DataContextProvider)
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
      setToken(res.data.token)
      setIsDisable(false);
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
        <span>save, share and sicover the best links on the web</span>

        </div>
      </Sidebar>

    <Container>
      <label>
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
       
      <button type="submit" disabled={isDisable}>Log In</button>
      </form>

      </label>

      <StyledLink to="/signup">First time? Create an account!</StyledLink>

    </Container>
    </Body>
      
  )
}
