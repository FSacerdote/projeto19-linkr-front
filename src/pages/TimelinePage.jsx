import { styled } from "styled-components"
import Header from "../components/Header"
import PostForm from "../components/PostForm"
import Post from "../components/Post"
import TrendingBoard from "../components/TrendingBoard"

export default function TimelinePage(){
    return(
        <Page>
            <Header></Header>
            <Timeline>
                <h1>timeline</h1>
                <PostForm></PostForm>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </Timeline>
            <TrendingBoard></TrendingBoard>
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
    padding-bottom: 20px;
    overflow: scroll;
    margin-top: 53px;
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
