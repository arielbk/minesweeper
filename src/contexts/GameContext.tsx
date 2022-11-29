import useIsAway from 'hooks/useIsAway';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { findContiguousArea } from 'utilities/mineCoordinates';
import { Coordinate } from 'utilities/types';
import { GridContext } from './GridContext';

type GameState = 'FRESH' | 'PAUSED' | 'RUNNING' | 'LOST' | 'WON';

type GameValues = {
  startTime: number;
  flagCount: number;
  isMouseDown: boolean;
  handleRestart: () => void;
  handleSelectCell: (cell: Coordinate) => void;
  setIsMouseDown: (isDown: boolean) => void;
  gameState?: GameState;
  isFlagMode: boolean;
  toggleFlagMode: () => void;
  timeElapsed: number;
  setTimeElapsed: (time: number) => void;
  togglePaused: () => void;
};

export const GameContext = createContext({} as GameValues);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameState, setGameState] = useState<GameState>('FRESH');
  const [startTime, setStartTime] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [isFlagMode, setIsFlagMode] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  // todo: we are assuming that the grid is always square (for now)
  const {
    mineLocations,
    flagGrid,
    flagCount,
    isRevealedGrid,
    valueGrid,
    handleRevealCells,
    resetUserGrids,
    resetValueGrid,
    gridLength,
  } = useContext(GridContext);
  const isAway = useIsAway();

  // pause game if use is away
  useEffect(() => {
    if (isAway) setGameState('PAUSED');
  }, [isAway]);

  // restart game if grid size changes
  useEffect(() => {
    handleRestart();
  }, [gridLength]); // eslint-disable-line

  useEffect(() => {
    if (gameState === 'RUNNING') setStartTime(Date.now());
  }, [gameState, gridLength]);

  // check if we have a winner
  useEffect(() => {
    if (!mineLocations.length) return;
    // check if each is flagged
    const allFlagged = mineLocations.every((loc) => {
      const [x, y] = loc;
      return flagGrid[y][x];
    });
    // set winner state
    if (allFlagged) setGameState('WON');
    // todo: reveal all cells but mine bg should not be red
  }, [flagCount, flagGrid, mineLocations]);

  const handleRestart = () => {
    setGameState('FRESH');
    setStartTime(Date.now());
    setTimeElapsed(0);
    setIsFlagMode(false);
    resetUserGrids();
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: Coordinate) => {
    // use value state if game already started, otherwise use returned value
    let gridValues = valueGrid;
    if (gameState === 'FRESH') {
      gridValues = resetValueGrid(cell);
      setGameState('RUNNING');
    }
    const [x, y] = cell;
    // set initial start time
    if (!startTime) setStartTime(Date.now());
    // ignore if dead, already revealed, or flagged
    if (gameState === 'LOST' || isRevealedGrid[y][x] === true || flagGrid[y][x])
      return;
    if (gridValues[y][x] === 'M') setGameState('LOST');
    if (gridValues[y][x] !== '0') return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], gridValues);
    handleRevealCells(toReveal);
  };

  const toggleFlagMode = () => setIsFlagMode((prev) => !prev);
  const togglePaused = () => {
    if (gameState === 'RUNNING') setGameState('PAUSED');
    else setGameState('RUNNING');
  };

  return (
    <GameContext.Provider
      value={{
        gameState,
        isMouseDown,
        startTime,
        flagCount,
        handleRestart,
        handleSelectCell,
        setIsMouseDown,
        isFlagMode,
        toggleFlagMode,
        timeElapsed,
        setTimeElapsed,
        togglePaused,
      }}
    >
      <>{children}</>
    </GameContext.Provider>
  );
};
