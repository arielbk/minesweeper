import React, { useState, useEffect } from "react";
import Square from "../Square";
import styled from "styled-components";

const StyledRow = styled.div`
  display: block;
  margin: 0;
`;

interface RowProps {
  row: number[];
  width: number;
  height: number;
}

const Row: React.FC<RowProps> = ({ row, width, height }) => {
  console.log({ width, height });
  return (
    <StyledRow>
      {row.map((cell) => (
        <Square />
      ))}
    </StyledRow>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  margin: 2rem auto;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

interface Props {
  width: number;
  height: number;
}

const Grid: React.FC<Props> = ({ width, height }) => {
  const [matrix, setMatrix] = useState([[0]]);

  useEffect(() => {
    const matrixGrid = [];
    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        row.push(y);
      }
      matrixGrid.push(row);
    }
    setMatrix(matrixGrid);
  }, [width, height]);

  return (
    <Container width={width * 32} height={height * 32}>
      {matrix.map((row) => (
        <Row row={row} width={width} height={height} />
      ))}
    </Container>
  );
};

export default Grid;
