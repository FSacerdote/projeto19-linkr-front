import { styled } from "styled-components"

export default function Header (){
    return(
        <Container>
            <Logo>linkr</Logo>
            <User>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
            </User>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 72px;
    width: 100%;
    background-color: #151515;
    padding-left: 28px;
    padding-right: 17px;
`

const Logo = styled.p`
    font-family: 'Passion One', cursive;
    color: white;
    font-size: 49px;
    font-weight: 700;
    letter-spacing: 2.45px; 
`

const User = styled.div`
    img{
        height: 53px;
        width: 53px;
        border-radius: 53px;
    }
`