import React, { createContext, useState, useEffect } from "react";
import useValueGrid from "hooks/useValueGrid";
import useIsRevealedGrid from "hooks/useIsRevealedGrid";
import { findContiguousArea } from "utilities/mineCoordinates";
import useFlagGrid from "hooks/useFlagGrid";

export const GameContext = createContext({
  /**
   * State
   */
  isDead: false,
  startTime: 0,
  currentScore: 0,
  // todo: these could go in a settings context?
  gridWidth: 15,
  gridHeight: 15,
  valueGrid: [["M"]],
  isRevealedGrid: [[false]],
  flagGrid: [[false]],
  isMouseDown: false,

  /**
   * Functions
   */
  handleRestart: () => {},
  handleSelectCell: (cell: [number, number]) => {},
  handleFlagCell: (cell: [number, number]) => {},
  setIsMouseDown: (isDown: boolean) => {},
});

export const GameProvider: React.FC = ({ children }) => {
  const [isDead, setIsDead] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const gridWidth = 15;
  const gridHeight = 15;

  //grid values
  const gridParams = { gridWidth, gridHeight, startTime };
  const { valueGrid } = useValueGrid(gridParams);
  const { isRevealedGrid, handleRevealCells } = useIsRevealedGrid(gridParams);
  const { flagGrid, handleFlagCell } = useFlagGrid(gridParams);

  // is running becomes true, a new start time is set
  useEffect(() => {
    if (!isDead) setStartTime(Date.now());
  }, [isDead]);

  const handleRestart = () => {
    setIsDead(false);
    setStartTime(Date.now());
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: [number, number]) => {
    const [x, y] = cell;
    // set initial start time
    if (!startTime) setStartTime(Date.now());
    if (isDead || isRevealedGrid[y][x] === true) return;
    if (valueGrid[y][x] === "M") setIsDead(true);
    if (valueGrid[y][x] !== "0") return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], valueGrid);
    handleRevealCells(toReveal);
  };

  return (
    <GameContext.Provider
      value={{
        isDead,
        isMouseDown,
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
        setIsMouseDown,
      }}
    >
      <>{children}</>
    </GameContext.Provider>
  );
};
