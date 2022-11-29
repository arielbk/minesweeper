import { useCallback, useState } from 'react';
import { Coordinate } from 'utilities/types';

interface GridParams {
  gridLength: number;
  mineCount: number;
}

interface FlagGrid {
  flagGrid: boolean[][];
  handleFlagCell: (cell: Coordinate) => void;
  flagCount: number;
  reset: () => void;
}

const useFlagGrid = ({ gridLength, mineCount }: GridParams): FlagGrid => {
  const [flagGrid, setFlagGrid] = useState<boolean[][]>([]);
  const [flagCount, setFlagCount] = useState<number>(mineCount);

  const initializeGrid = useCallback(() => {
    setFlagGrid(new Array(gridLength).fill(new Array(gridLength).fill(false)));
    setFlagCount(mineCount);
  }, [mineCount, gridLength]);

  // toggles flag cell
  const handleFlagCell = (cell: Coordinate): void => {
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
