import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import React, { useContext } from 'react';
import Cell from '../Cell';

const Container = styled.div<{ width: number; height: number }>`
  margin: 1rem auto;
  box-sizing: content-box;
  width: 500px;
  height: 500px;
  display: grid;
  grid-template-rows: ${({height}) => `repeat(${height}, 1fr)`};
  grid-template-columns: ${({width}) => `repeat(${width}, 1fr)`};
  grid-gap: ${({width}) => Math.floor(70 / width) + 'px'};
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
      width={gridWidth}
      height={gridHeight}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {valueGrid.map((row, y) => {
        return row.map((cell, x) => (
          <Cell
            fontSize={250 / gridWidth}
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
