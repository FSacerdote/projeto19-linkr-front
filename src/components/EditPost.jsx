import { PiPencilFill } from "react-icons/pi";
import { styled } from "styled-components";

export default function EditPost() {
  return (
    <SCEditPost>
      <EditIcon />
    </SCEditPost>
  );
}

const SCEditPost = styled.div`
  display: flex;
  cursor: pointer;
  color: #fff;
`;

const EditIcon = styled(PiPencilFill)`
  font-size: 20px;
`;
