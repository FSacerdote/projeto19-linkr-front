import { styled } from "styled-components";
import { BiRefresh } from "react-icons/bi"

export default function AlertNewPosts({number, handleClick}) {
  return (
    <Alert onClick={handleClick}>
      <p>{number} new {number === 1? "post" : "posts"}, load more!</p>
      <Refresh></Refresh>
    </Alert>
  );
}

const Alert = styled.button`
  width: 100%;
  max-width: 611px;
  height: 61px;
  font-family: "Lato", sans-serif;
  background-color: #1877F2;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 16px;
`;

const Refresh = styled(BiRefresh)`
  margin-left: 15px;
  font-size: 30px;
`;
