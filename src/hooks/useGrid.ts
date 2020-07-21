import { useState, useEffect } from "react";

const calculateAdjacentMines = (loc: number[], mines: number[][]): string => {
  let count = 0;
  mines.forEach((mine) => {
    if (
      (loc[0] === mine[0] ||
        loc[0] - 1 === mine[0] ||
        loc[0] + 1 === mine[0]) &&
      (loc[1] === mine[1] || loc[1] - 1 === mine[1] || loc[1] + 1 === mine[1])
    ) {
      count += 1;
    }
  });
  return String(count);
};

const useGrid = ({ width, height }: { width: number; height: number }) => {
  // 2d array, number of mines or mine
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);
  // 2d array, number of mines
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(height).fill(new Array(width).fill(false))
  );
  // 2d array, safe areas
  const [safeArea, setSafeArea] = useState<number[][]>([[]]);

  // initializes grid values
  useEffect(() => {
    // determine mine locations
    const mineCount = Math.floor((width * height) / 6);
    const minesToSet: number[][] = [];

    while (minesToSet.length < mineCount) {
      const mineLocation = [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
      ];
      if (!minesToSet.includes(mineLocation)) minesToSet.push(mineLocation);
    }

    // populate value grid
    const valuesToSet: string[][] = [];
    for (let x = 0; x < width; x++) {
      const row: string[] = [];
      for (let y = 0; y < height; y++) {
        const adjacentMines = calculateAdjacentMines([x, y], minesToSet);
        row.push(adjacentMines);
      }
      valuesToSet.push(row);
    }
    // lay mines
    minesToSet.forEach((mine) => (valuesToSet[mine[0]][mine[1]] = "M"));

    setValueGrid(valuesToSet);
  }, [height, width]);

  // calculates all contiguous safe areas
  useEffect(() => {
    // if (valueGrid.length < 2) return;
    // const safeAreas: string[][][] = [];
    // valueGrid.forEach((row) => {
    //   row.forEach((cell) => {
    //     if (cell !== "0") return;
    //     let isCounted = false;
    //     // safe area contains the current cell somewhere
    //     safeArea.some((row) =>
    //       row.some((col) => col[0] == cell && col[1] == row)
    //     );
    //   });
    // });
  }, [safeArea, valueGrid]);

  // sets cells to revealed
  const handleRevealCells = (cells: number[][]): void => {
    const isRevealedCopy = isRevealedGrid.map((row) => row.map((col) => col));
    cells.forEach(([x, y]) => {
      isRevealedCopy[y][x] = true;
    });
    setIsRevealedGrid(isRevealedCopy);
  };

  // determines what to do with selected cell
  const handleSelectCell = (x: number, y: number) => {
    if (isRevealedGrid[y][x] === true) return;
    if (valueGrid[y][x] !== "0") return handleRevealCells([[x, y]]);
  };

  return {
    valueGrid,
    isRevealedGrid,
    handleSelectCell,
  };
};

export default useGrid;
