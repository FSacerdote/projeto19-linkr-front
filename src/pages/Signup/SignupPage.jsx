import { Body, Container, Sidebar, StyledLink } from "../../style/FormsStyle"

export default function SignupPage(){
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
        <input
          type="text"
          placeholder="username"
          name="username"
          required
        />
        <input
          type="url"
          placeholder="picture url"
          name="pictureUrl"
          required
        />
      <button>Sign Up</button>
      </form>

      </label>

      <StyledLink>Switch back to log in</StyledLink>
    </Container>
    </Body>
      
  )
}
