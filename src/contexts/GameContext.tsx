import React, { createContext, useState, useEffect } from "react";
import useValueGrid from "hooks/useValueGrid";
import useIsRevealedGrid from "hooks/useIsRevealedGrid";
import { findContiguousArea } from "utilities/mineCoordinates";
import useFlagGrid from "hooks/useFlagGrid";

export const GameContext = createContext({
  /**
   * State
   */
  isRunning: false,
  startTime: 0,
  currentScore: 0,
  // todo: these could go in a settings context?
  gridWidth: 15,
  gridHeight: 15,
  valueGrid: [["M"]],
  isRevealedGrid: [[false]],
  flagGrid: [[false]],

  /**
   * Functions
   */
  handleRestart: () => {},
  handleSelectCell: (cell: [number, number]) => {},
  handleFlagCell: (cell: [number, number]) => {},
});

export const GameProvider: React.FC = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const gridWidth = 15;
  const gridHeight = 15;

  //grid values
  const gridParams = { gridWidth, gridHeight, startTime };
  const { valueGrid } = useValueGrid(gridParams);
  const { isRevealedGrid, handleRevealCells } = useIsRevealedGrid(gridParams);
  const { flagGrid, handleFlagCell } = useFlagGrid(gridParams);

  // is running becomes true, a new start time is set
  useEffect(() => {
    if (isRunning) setStartTime(Date.now());
  }, [isRunning]);

  const handleRestart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: [number, number]) => {
    const [x, y] = cell;
    if (isRevealedGrid[y][x] === true) return;
    if (valueGrid[y][x] !== "0") return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], valueGrid);
    handleRevealCells(toReveal);
  };

  console.log("start time from context", startTime);
  return (
    <GameContext.Provider
      value={{
        isRunning,
        startTime,
        currentScore: 0,
        gridWidth,
        gridHeight,
        valueGrid,
        isRevealedGrid,
        flagGrid,
        handleRestart,
        handleSelectCell,
        handleFlagCell,
      }}
    >
      <>{children}</>
    </GameContext.Provider>
  );
};
