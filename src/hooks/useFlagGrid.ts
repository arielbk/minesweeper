import { useState, useEffect } from 'react';

interface GridParams {
  gridLength: number;
  mineCount: number;
}

const useFlagGrid = ({ gridLength, mineCount }: GridParams) => {
  const [flagGrid, setFlagGrid] = useState<boolean[][]>([]);
  const [flagCount, setFlagCount] = useState<number>(mineCount);

  const initializeGrid = () => {
    setFlagGrid(new Array(gridLength).fill(new Array(gridLength).fill(false)));
    setFlagCount(mineCount);
  };

  // initialize flag grid with no flags and set flags left
  useEffect(() => {
    initializeGrid();
  }, [gridLength, mineCount]);

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
    reset: initializeGrid,
  };
};

export default useFlagGrid;
