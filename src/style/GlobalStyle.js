import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;

    }
    body {
        font-family: "Lato", sans-serif;
    }
    button {
        border: none;
        background: none;
        cursor: pointer;
    }
`;

export default GlobalStyle;
