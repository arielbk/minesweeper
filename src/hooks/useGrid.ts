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
  // stores a 2d array, number of mines or mine
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);
  // stores a 2d array, number of mines
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(height).fill(new Array(width).fill(false))
  );

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
    const valuesToSet = [];
    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        if (minesToSet.includes([x, y])) {
          row.push("M");
        } else {
          const adjacentMines = calculateAdjacentMines([x, y], minesToSet);
          row.push(adjacentMines);
        }
      }
      valuesToSet.push(row);
    }
    setValueGrid(valuesToSet);
  }, [height, width]);

  const handleRevealCell = (x: number, y: number) => {
    if (isRevealedGrid[y][x] === true) return;
    // if (valueGrid[y][x] === "0") {
    //   if (x - 1 >= 0) handleRevealCell(x - 1, y);
    //   if (x + 1 < width) handleRevealCell(x + 1, y);
    //   if (y - 1 >= 0) handleRevealCell(x, y - 1);
    //   if (y + 1 < height) handleRevealCell(x, y + 1);
    // }
    const isRevealedCopy = isRevealedGrid.map((row) => row.map((col) => col));
    isRevealedCopy[y][x] = true;
    setIsRevealedGrid(isRevealedCopy);
  };

  return {
    valueGrid,
    isRevealedGrid,
    handleRevealCell,
  };
};

export default useGrid;
