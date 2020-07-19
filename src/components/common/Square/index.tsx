import React from "react";
import styled from "styled-components";

const StyledSquare = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  background: #eee;
  background: linear-gradient(45deg, #eee, #ccc);
  outline: 0;

  &:active {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

interface Props {}

const Square: React.FC<Props> = () => {
  return <StyledSquare />;
};

export default Square;
