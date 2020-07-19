import React, { useState } from "react";
import styled from "styled-components";
import { MdFlag } from "react-icons/md";

const CellButton = styled.button`
  vertical-align: top;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #777;
  background: #eee;
  background: linear-gradient(45deg, #eee, #ccc);
  outline: 0;
  color: red;
  font-size: 18px;

  &:active {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

const CellLabel = styled.div`
  vertical-align: top;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: #777;
  color: #fff;
`;

interface Props {
  isRevealed: boolean;
  value: string;
}

const Cell: React.FC<Props> = ({ isRevealed, value }) => {
  const [isFlagged, setIsFlagged] = useState(false);

  const handleToggleFlag = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsFlagged((prev) => !prev);
  };

  return isRevealed ? (
    <CellLabel>{value}</CellLabel>
  ) : (
    <CellButton onContextMenu={handleToggleFlag}>
      {isFlagged ? <MdFlag /> : ""}
    </CellButton>
  );
};

export default Cell;
