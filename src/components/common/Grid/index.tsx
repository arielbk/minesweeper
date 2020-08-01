import React, { useContext } from "react";
import Cell from "../Cell";
import styled from "styled-components";
import { GameContext } from "contexts/GameContext";

const StyledRow = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  height: 30px;
`;

interface RowProps {
  y: number;
  valueRow: string[];
}

const Row: React.FC<RowProps> = ({ y, valueRow }) => {
  const {
    flagGrid,
    isRevealedGrid,
    handleSelectCell,
    handleFlagCell,
  } = useContext(GameContext);
  return (
    <StyledRow>
      {valueRow.map((cell, x) => (
        <Cell
          value={cell}
          isRevealed={isRevealedGrid[y][x]}
          isFlagged={flagGrid[y][x]}
          onFlagCell={(e) => {
            e.preventDefault();
            handleFlagCell([x, y]);
          }}
          onSelectCell={() => handleSelectCell([x, y])}
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

const Grid: React.FC = () => {
  const { gridWidth, gridHeight, valueGrid } = useContext(GameContext);
  return (
    <Container width={gridWidth * 30} height={gridHeight * 30}>
      {valueGrid.map((row, i) => (
        <Row y={i} valueRow={row} key={i} />
      ))}
    </Container>
  );
};

export default Grid;
