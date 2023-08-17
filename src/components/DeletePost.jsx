import { AiFillDelete } from "react-icons/ai";
import { styled } from "styled-components";

export default function DeletePost() {
  return (
    <SCDeletePOst>
      <DeleteIcon />
    </SCDeletePOst>
  );
}

const SCDeletePOst = styled.div`
  display: flex;
  cursor: pointer;
  color: #fff;
`;

const DeleteIcon = styled(AiFillDelete)`
  font-size: 20px;
`;
