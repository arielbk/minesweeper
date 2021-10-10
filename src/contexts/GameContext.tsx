import React, { createContext, useState, useEffect, useContext } from 'react';
import { findContiguousArea } from 'utilities/mineCoordinates';
import { useMachine } from '@xstate/react';
import gameMachine, { GameContextType } from './gameMachine';
import { GridContext } from './GridContext';
import { AnyEventObject, State } from 'xstate';
import useIsAway from 'utilities/useIsAway';

const defaultValues = {
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

  isFlagMode: false,
  toggleFlagMode: () => {
    //
  },
  timeElapsed: 0,
  setTimeElapsed: (time: number) => {
    //
  },
  togglePaused: () => {
    //
  },
};

type GameProps = {
  startTime: number;
  flagCount: number;
  isMouseDown: boolean;
  handleRestart: () => void;
  handleSelectCell: (cell: [number, number]) => void;
  setIsMouseDown: (isDown: boolean) => void;
  gameState?: State<
    GameContextType,
    AnyEventObject,
    any, // eslint-disable-line
    {
      value: any; // eslint-disable-line
      context: GameContextType;
    }
  >;
  isFlagMode: boolean;
  toggleFlagMode: () => void;
  timeElapsed: number;
  setTimeElapsed: (time: number) => void;
  togglePaused: () => void;
};

export const GameContext = createContext<GameProps>(defaultValues);

export const GameProvider: React.FC = ({ children }) => {
  const [current, send] = useMachine(gameMachine);
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
    resetGrids,
    gridLength,
  } = useContext(GridContext);
  const isAway = useIsAway();

  // pause game if use is away
  useEffect(() => {
    if (isAway) send('PAUSE');
  }, [isAway, send]);

  // restart game if grid size changes
  useEffect(() => {
    handleRestart();
  }, [gridLength]); // eslint-disable-line

  useEffect(() => {
    if (current.matches('running')) setStartTime(Date.now());
  }, [current, current.value, gridLength]);

  // check if we have a winner
  useEffect(() => {
    if (!mineLocations.length) return;
    // check if each is flagged
    const allFlagged = mineLocations.every((loc) => {
      const [x, y] = loc;
      return flagGrid[y][x];
    });
    // set winner state
    if (allFlagged) send('WIN');
    // todo: reveal all cells but mine bg should not be red
  }, [flagCount, flagGrid, mineLocations, current, send]);

  const handleRestart = () => {
    send('RESTART');
    setStartTime(Date.now());
    setTimeElapsed(0);
    setIsFlagMode(false);
    resetGrids();
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: [number, number]) => {
    // ensure game is running
    send('RESUME');
    const [x, y] = cell;
    // set initial start time
    if (!startTime) setStartTime(Date.now());
    // ignore if dead, already revealed, or flagged
    if (
      current.matches('lost') ||
      isRevealedGrid[y][x] === true ||
      flagGrid[y][x]
    )
      return;
    if (valueGrid[y][x] === 'M') send('LOSE');
    if (valueGrid[y][x] !== '0') return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], valueGrid);
    handleRevealCells(toReveal);
  };

  const toggleFlagMode = () => setIsFlagMode((prev) => !prev);
  const togglePaused = () => {
    if (current.matches('running')) send('PAUSE');
    else send('RESUME');
  };

  return (
    <GameContext.Provider
      value={{
        gameState: current,
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
