import { styled } from "styled-components";
import { TailSpin } from "react-loader-spinner";

export default function LoadingMorePosts() {
  return (
    <Loading>
      <TailSpin width="40" radius="0" color="#6d6d6d"></TailSpin>
      <p>Loading more posts...</p>
    </Loading>
  );
}

const Loading = styled.div`
  margin: 60px auto 300px auto;
  width: 226px;
  height: 78px;
  font-family: "Lato", sans-serif;
  color: #6d6d6d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
`;
