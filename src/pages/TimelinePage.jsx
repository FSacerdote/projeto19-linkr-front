import { styled } from "styled-components"
import Header from "../components/Header"
import PostForm from "../components/PostForm"
import Post from "../components/Post"

export default function TimelinePage(){
    return(
        <Page>
            <Header></Header>
            <Timeline>
                <h1>timeline</h1>
                <PostForm></PostForm>
                <Post></Post>
            </Timeline>
        </Page>
    )
}

const Page = styled.div`
    height: 100vh;
    background-color:#333;
    padding-top: 72px;
    display: flex;
    justify-content: center;
`

const Timeline = styled.div`
    margin-top: 78px;
    width: 611px;
    display: flex;
    flex-direction: column;
    h1{
        color: #FFF;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        font-style: normal;
        font-weight: 700;
        line-height: normal; 
    }
`
