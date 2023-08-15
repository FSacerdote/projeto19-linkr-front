import { styled } from "styled-components"

export default function Post(){
    return(
        <Container>
            <User>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
            </User>
            <Content>
                <UserName>Juvenal Juvêncio</UserName>
                <Text>Muito maneiro esse tutorial de Material UI com React, deem uma olhada!</Text>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    margin-top: 29px;
    height: 276px;
    border-radius: 16px;
    background: #171717;
    display: flex;
    padding-right: 21px;
    flex-shrink: 0;
`
const User = styled.div`
    margin-top: 16px;
    margin-left: 18px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 27px;
    }
`

const Content = styled.div`
    margin-left: 18px;
    p{
        font-family: 'Lato', sans-serif;
        font-weight: 400;
    }
`

const UserName = styled.p`
    margin-top: 19px;
    color: #FFF;
    font-size: 19px;
`

const Text = styled.p`
    margin-top: 7px;
    color: #B7B7B7; 
    font-size: 17px;
`
