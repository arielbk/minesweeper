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
  isWinner: false,
  startTime: 0,
  currentScore: 0,
  // todo: these could go in a settings context?
  gridWidth: 15,
  gridHeight: 15,
  valueGrid: [["M"]],
  isRevealedGrid: [[false]],
  flagGrid: [[false]],
  flagCount: 0,
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
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const gridWidth = 10;
  const gridHeight = 10;

  //grid values
  const gridParams = { gridWidth, gridHeight, startTime };
  const { valueGrid, mineLocations } = useValueGrid(gridParams);
  const { isRevealedGrid, handleRevealCells } = useIsRevealedGrid(gridParams);
  const { flagGrid, handleFlagCell, flagCount } = useFlagGrid({
    ...gridParams,
    mineCount: mineLocations.length,
  });

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
  };

  // determines what to do with selected cell
  const handleSelectCell = (cell: [number, number]) => {
    const [x, y] = cell;
    // set initial start time
    if (!startTime) setStartTime(Date.now());
    // ignore if dead, already revealed, or flagged
    if (isDead || isRevealedGrid[y][x] === true || flagGrid[y][x]) return;
    if (valueGrid[y][x] === "M") setIsDead(true);
    if (valueGrid[y][x] !== "0") return handleRevealCells([[x, y]]);
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
        currentScore: 0,
        gridWidth,
        gridHeight,
        valueGrid,
        isRevealedGrid,
        flagGrid,
        flagCount,
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
