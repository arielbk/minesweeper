import { useCallback, useState } from 'react';
import { Coordinate } from 'utilities/types';

interface GridParams {
  gridLength: number;
}

interface IsRevealedGrid {
  isRevealedGrid: boolean[][];
  handleRevealCells: (cells: Coordinate[]) => void;
  reset: () => void;
}

const useIsRevealedGrid = ({ gridLength }: GridParams): IsRevealedGrid => {
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(gridLength).fill(new Array(gridLength).fill(false)),
  );

  const initializeGrid = useCallback(() => {
    setIsRevealedGrid(
      new Array(gridLength).fill(new Array(gridLength).fill(false)),
    );
  }, [gridLength]);

  // sets cells to revealed
  const handleRevealCells = (cells: Coordinate[]): void => {
    const isRevealedCopy = isRevealedGrid.map((row) => row.map((col) => col));
    cells.forEach(([x, y]) => {
      isRevealedCopy[y][x] = true;
    });
    setIsRevealedGrid(isRevealedCopy);
  };

  return {
    isRevealedGrid,
    handleRevealCells,
    reset: initializeGrid,
  };
};

export default useIsRevealedGrid;
