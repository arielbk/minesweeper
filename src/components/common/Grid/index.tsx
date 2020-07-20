import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import styled from "styled-components";
import useGrid from "../../../hooks/useGrid";

const StyledRow = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  height: 30px;
`;

interface RowProps {
  y: number;
  valueRow: string[];
  isRevealedRow: boolean[];
  onRevealCell: (x: number, y: number) => void;
}

const Row: React.FC<RowProps> = ({
  y,
  valueRow,
  isRevealedRow,
  onRevealCell,
}) => {
  return (
    <StyledRow>
      {valueRow.map((cell, x) => (
        <Cell
          value={cell}
          isRevealed={isRevealedRow[x]}
          onRevealCell={() => onRevealCell(x, y)}
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
  const { valueGrid, isRevealedGrid, handleRevealCell } = useGrid({
    width,
    height,
  });

  if (!valueGrid) return <>Loading... </>;
  return (
    <Container width={width * 30} height={height * 30}>
      {valueGrid.map((row, i) => (
        <Row
          y={i}
          valueRow={row}
          isRevealedRow={isRevealedGrid[i]}
          key={i}
          onRevealCell={handleRevealCell}
        />
      ))}
    </Container>
  );
};

export default Grid;
