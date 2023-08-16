import axios from "axios"
import { useState } from "react"
import { styled } from "styled-components"

export default function PostForm (){

    const [url, setUrl] = useState("")
    const [description, setDescription] = useState("")
    const [habilitado, setHabilitado] = useState(false)

    const config = {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkyMTYxOTc5LCJleHAiOjE2OTQ3NTM5Nzl9.vPyTUyhgbh2FXzjq4fbbjWXTICseCRA3FkmA2rqknGI`
        }
    }

    function newPost(event){
        event.preventDefault()
        setHabilitado(true)
        axios.post(`http://localhost:5000/posts`, {url, description} , config)
            .then(()=>{
                setHabilitado(false)
                setDescription("")
                setUrl("")
                // refresh nos posts
            })
            .catch(()=>{
                alert("Houve um erro ao publicar o seu link")
                setHabilitado(false)
            })
    }

    return(
        <Container>
            <User>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" alt="" />
            </User>
            <Form onSubmit={newPost}>
                <p>What are you going to share today?</p>
                <Url placeholder="http://..." type="url" value={url} onChange={(e)=> setUrl(e.target.value)} disabled={habilitado} required/>
                <Description placeholder="Awesome article about #javascript" type="text" value={description} onChange={(e)=> setDescription(e.target.value)} disabled={habilitado}/>
                <button type="submit" disabled={habilitado}>{!habilitado? "Publish":"Publishing..."}</button>
            </Form>
        </Container>
    )
}

const Container = styled.div`
    flex-shrink: 0;
    margin-top: 43px;
    height: 209px;
    width: 100%;
    border-radius: 16px;
    background-color: white;
    display: flex;
    padding-right: 21px;
    margin-bottom: 13px;
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

const Form = styled.form`
    position: relative;
    margin-top: 21px;
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    p{
        color: #707070;
        font-family: 'Lato', sans-serif;
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: normal; 
    }
    input{
        width: 503px;
        background-color: #EFEFEF;
        border: none;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        font-weight: 300;
        padding-left: 12px;
    }
    button{
        width: 122px;
        height: 31px;
        position: absolute;
        bottom: 16px;
        right: 0;
        background: #1877F2;
        border: none;
        border-radius: 5px;
        color: white;
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        font-weight: 700;
        &:disabled{
            filter: brightness(0.8);
        }
    }
`

const Url = styled.input`
    margin-top: 7px;
    height: 30px;
    &:disabled{
        filter: brightness(0.9);
    }
`

const Description = styled.textarea`
    margin-top: 5px;
    height: 66px;
    background-color: #EFEFEF;
    border: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    font-size: 15px;
    font-weight: 300;
    padding-left: 12px;
    padding-top: 8px;
    resize: none;
    &:disabled{
            filter: brightness(0.9);
    }
`