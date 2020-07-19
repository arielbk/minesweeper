import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import styled from "styled-components";

const StyledRow = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  height: 30px;
`;

interface RowProps {
  row: string[];
}

const Row: React.FC<RowProps> = ({ row }) => {
  return (
    <StyledRow>
      {row.map((cell, i) => (
        <Cell
          value={String(cell)}
          isRevealed={Boolean(Math.floor(2 * Math.random()))}
          key={i}
        />
      ))}
    </StyledRow>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  margin: 2rem auto;
  box-sizing: content-box;
  border: 2px solid #bbb;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

interface Props {
  width: number;
  height: number;
}

const Grid: React.FC<Props> = ({ width, height }) => {
  // TODO: grid logic goes into a hook
  const [matrix, setMatrix] = useState([[""]]);

  useEffect(() => {
    const matrixGrid = [];
    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        row.push("");
      }
      matrixGrid.push(row);
    }
    setMatrix(matrixGrid);
  }, [width, height]);

  return (
    <Container width={width * 30} height={height * 30}>
      {matrix.map((row, i) => (
        <Row row={row} key={i} />
      ))}
    </Container>
  );
};

export default Grid;
