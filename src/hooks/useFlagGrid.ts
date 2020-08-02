import { useState, useEffect } from "react";

interface GridParams {
  gridWidth: number;
  gridHeight: number;
  startTime: number;
}

const useFlagGrid = ({ gridWidth, gridHeight, startTime }: GridParams) => {
  const [flagGrid, setFlagGrid] = useState<boolean[][]>(
    new Array(gridHeight).fill(new Array(gridWidth).fill(false))
  );

  useEffect(() => {
    setFlagGrid(new Array(gridHeight).fill(new Array(gridWidth).fill(false)));
  }, [gridHeight, gridWidth, startTime]);

  // toggles flag cell
  const handleFlagCell = (cell: [number, number]): void => {
    const [x, y] = cell;
    const flagGridCopy = flagGrid.map((row) => row.map((col) => col));
    flagGridCopy[y][x] = !flagGridCopy[y][x];
    setFlagGrid(flagGridCopy);
  };

  return {
    flagGrid,
    handleFlagCell,
  };
};

export default useFlagGrid;
