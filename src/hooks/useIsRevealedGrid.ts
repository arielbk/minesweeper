import { useState, useEffect } from "react";

interface GridParams {
  gridWidth: number;
  gridHeight: number;
  startTime: number;
}

const useIsRevealedGrid = ({
  gridWidth,
  gridHeight,
  startTime,
}: GridParams) => {
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(gridHeight).fill(new Array(gridWidth).fill(false))
  );

  useEffect(() => {
    setIsRevealedGrid(
      new Array(gridHeight).fill(new Array(gridWidth).fill(false))
    );
  }, [gridHeight, gridWidth, startTime]);

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
  };
};

export default useIsRevealedGrid;
