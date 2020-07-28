import { useState, useEffect, useContext } from "react";
import { GameContext } from "contexts/GameContext";

const useFlagGrid = () => {
  const { gridWidth, gridHeight, startTime } = useContext(GameContext);
  const [flagGrid, setFlagGrid] = useState<boolean[][]>(
    new Array(gridHeight).fill(new Array(gridWidth).fill(false))
  );

  useEffect(() => {
    setFlagGrid(new Array(gridHeight).fill(new Array(gridWidth).fill(false)));
  }, [gridHeight, gridWidth, startTime]);

  // sets cells to revealed
  const handleFlagCell = (cell: [number, number]): void => {
    const [x, y] = cell;
    const flagGridCopy = flagGrid.map((row) => row.map((col) => col));
    flagGridCopy[y][x] = true;
    setFlagGrid(flagGridCopy);
  };

  return {
    flagGrid,
    handleFlagCell,
  };
};

export default useFlagGrid;
