import { Body, Container, Sidebar, StyledLink } from "./FormsStyle";
export default function SigninPage(){
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
      <form>
        <input
          type="email"
          placeholder="e-mail"
          name="email"
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
       
      <button>Log In</button>
      </form>

      </label>

      <StyledLink to="/signup">First time? Create an account!</StyledLink>

    </Container>
    </Body>
      
  )
}
