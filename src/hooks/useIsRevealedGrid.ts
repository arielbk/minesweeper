import { useState, useEffect } from 'react';

interface GridParams {
  gridLength: number;
}

const useIsRevealedGrid = ({ gridLength }: GridParams) => {
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(gridLength).fill(new Array(gridLength).fill(false)),
  );

  const initializeGrid = () => {
    setIsRevealedGrid(
      new Array(gridLength).fill(new Array(gridLength).fill(false)),
    );
  };

  useEffect(() => {
    initializeGrid();
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
