import { useState, useEffect } from "react";

interface GridParams {
  gridWidth: number;
  gridHeight: number;
  mineCount: number;
  startTime: number;
}

const useFlagGrid = ({
  gridWidth,
  gridHeight,
  mineCount,
  startTime,
}: GridParams) => {
  const [flagGrid, setFlagGrid] = useState<boolean[][]>([]);
  const [flagCount, setFlagCount] = useState<number>(mineCount);

  // initialize flag grid with no flags and set flags left
  useEffect(() => {
    setFlagGrid(new Array(gridHeight).fill(new Array(gridWidth).fill(false)));
    setFlagCount(mineCount);
  }, [gridHeight, gridWidth, startTime, mineCount]);

  // toggles flag cell
  const handleFlagCell = (cell: [number, number]): void => {
    const [x, y] = cell;
    const flagGridCopy = flagGrid.map((row) => row.map((col) => col));
    flagGridCopy[y][x] = !flagGridCopy[y][x];
    // we are adding a flag
    if (flagGridCopy[y][x]) {
      if (flagCount < 1) return;
      setFlagCount(flagCount - 1);
    }
    // we are removing a flag
    else setFlagCount(flagCount + 1);
    setFlagGrid(flagGridCopy);
  };

  return {
    flagGrid,
    handleFlagCell,
    flagCount,
  };
};

export default useFlagGrid;
