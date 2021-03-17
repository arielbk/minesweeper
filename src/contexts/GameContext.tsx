/**
 * TODO: use xstate -- use a state machine for the state of the game
 * possible states:
 * - lost
 * - won
 * - running
 * - fresh
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { findContiguousArea } from 'utilities/mineCoordinates';
import { useMachine } from '@xstate/react';
import gameMachine from './gameMachine';
import { GridContext } from './GridContext';

export const GameContext = createContext({
  isDead: false,
  isWinner: false,
  startTime: 0,
  flagCount: 0,
  isMouseDown: false,

  handleRestart: () => {
    /* */
  },
  handleSelectCell: (cell: [number, number]) => {
    /* */
  },
  setIsMouseDown: (isDown: boolean) => {
    /* */
  },
});

export const GameProvider: React.FC = ({ children }) => {
  const [current, send] = useMachine(gameMachine);
  const [isDead, setIsDead] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  // todo: we are assuming that the grid is always square (for now)
  const {
    mineLocations,
    flagGrid,
    flagCount,
    isRevealedGrid,
    valueGrid,
    handleRevealCells,
    resetGrids,
  } = useContext(GridContext);

  useEffect(() => {
    if (!isDead) setStartTime(Date.now());
  }, [isDead]);

  // check if we have a winner
  useEffect(() => {
    if (!mineLocations.length) return;
    // check if each is flagged
    const allFlagged = mineLocations.every((loc) => {
      const [x, y] = loc;
      return flagGrid[y][x];
    });
    // set winner state
    if (allFlagged) setIsWinner(true);
    // todo: reveal all cells but mine bg should not be red
  }, [flagCount, flagGrid, mineLocations]);

  const handleRestart = () => {
    setIsDead(false);
    setIsWinner(false);
    setStartTime(Date.now());
    resetGrids();
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: [number, number]) => {
    const [x, y] = cell;
    // set initial start time
    if (!startTime) setStartTime(Date.now());
    // ignore if dead, already revealed, or flagged
    if (isDead || isRevealedGrid[y][x] === true || flagGrid[y][x]) return;
    if (valueGrid[y][x] === 'M') setIsDead(true);
    if (valueGrid[y][x] !== '0') return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], valueGrid);
    handleRevealCells(toReveal);
  };

  return (
    <GameContext.Provider
      value={{
        isDead,
        isWinner,
        isMouseDown,
        startTime,
        flagCount,
        handleRestart,
        handleSelectCell,
        setIsMouseDown,
      }}
    >
      <>{children}</>
    </GameContext.Provider>
  );
};
