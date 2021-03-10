import React, { useContext } from 'react';
import Cell from '../Cell';
import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';

const Container = styled.div<{ width: number; height: number }>`
  margin: 2rem auto;
  box-sizing: content-box;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Grid: React.FC = () => {
  const {
    gridWidth,
    gridHeight,
    valueGrid,
    setIsMouseDown,
    isRevealedGrid,
    flagGrid,
    handleFlagCell,
    handleSelectCell,
  } = useContext(GameContext);
  return (
    <Container
      data-cy="grid"
      width={gridWidth * 30}
      height={gridHeight * 30}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {valueGrid.map((row, y) => {
        return row.map((cell, x) => (
          <Cell
            key={x}
            value={cell}
            isRevealed={isRevealedGrid[y][x]}
            isFlagged={flagGrid[y][x]}
            onFlagCell={(e) => {
              e.preventDefault();
              handleFlagCell([x, y]);
            }}
            onSelectCell={() => handleSelectCell([x, y])}
          />
        ));
      })}
    </Container>
  );
};

export default Grid;
