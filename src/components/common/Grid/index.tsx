import { useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import { GridContext } from 'contexts/GridContext';
import React, { useContext } from 'react';
import Cell from '../Cell';

const Container = styled.div<{
  isPaused: boolean;
  width: number;
  height: number;
}>`
  box-sizing: content-box;
  width: min(90vw, 73vh);
  height: min(90vw, 73vh);
  display: grid;
  grid-template-rows: ${({ height }) => `repeat(${height}, 1fr)`};
  grid-template-columns: ${({ width }) => `repeat(${width}, 1fr)`};
  grid-gap: ${({ width }) => Math.floor(70 / width) + 'px'};
  transition: filter 0.1s ease-in-out;
  ${({ isPaused }) => isPaused && `filter: blur(18px);`}
`;

const PausedOverlay = styled.button`
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 3rem;
  text-transform: lowercase;
  color: rgba(0, 0, 0, 0.3);
`;

const Grid: React.FC = () => {
  const {
    gameState,
    setIsMouseDown,
    handleSelectCell,
    timeElapsed,
    togglePaused,
  } = useContext(GameContext);
  const { gridLength, valueGrid, isRevealedGrid, flagGrid, handleFlagCell } =
    useContext(GridContext);

  const theme = useTheme();
  const isPaused = !!timeElapsed && !!gameState?.matches('paused');

  return (
    <div style={{ position: 'relative' }}>
      <Container
        isPaused={isPaused}
        data-cy="grid"
        width={gridLength}
        height={gridLength}
        onMouseDown={() => setIsMouseDown(true)}
        onMouseUp={() => setIsMouseDown(false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        {valueGrid.map((row, y) => {
          return row.map((cell, x) => (
            <Cell
              fontSize={250 / gridLength}
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
      {isPaused && (
        <PausedOverlay
          style={{ fontFamily: theme.fonts.heading }}
          onClick={togglePaused}
        >
          Paused
        </PausedOverlay>
      )}
    </div>
  );
};

export default Grid;
