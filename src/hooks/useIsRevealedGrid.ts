import { useCallback, useState } from 'react';

interface GridParams {
  gridLength: number;
}

interface IsRevealedGrid {
  isRevealedGrid: boolean[][];
  handleRevealCells: (cells: [number, number][]) => void;
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
  const handleRevealCells = (cells: [number, number][]): void => {
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
