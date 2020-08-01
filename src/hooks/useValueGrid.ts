import { useState, useEffect } from "react";
import { calculateAdjacentMines } from "utilities/mineCoordinates";

interface GridParams {
  gridWidth: number;
  gridHeight: number;
  startTime: number;
}

const useValueGrid = ({ gridWidth, gridHeight, startTime }: GridParams) => {
  // 2d array, number of adjacent mines
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);

  // initializes grid values
  const initializeGrid = () => {
    // determine mine locations
    const mineCount = Math.floor((gridWidth * gridHeight) / 6);
    const minesToSet: [number, number][] = [];

    while (minesToSet.length < mineCount) {
      const mineLocation: [number, number] = [
        Math.floor(Math.random() * gridWidth),
        Math.floor(Math.random() * gridHeight),
      ];
      // ensure there are no duplicate mines
      if (
        !minesToSet.some(
          (mineToSet) =>
            mineToSet[0] === mineLocation[0] && mineToSet[1] === mineLocation[1]
        )
      )
        minesToSet.push(mineLocation);
    }

    // populate value grid
    const valuesToSet: string[][] = [];
    for (let x = 0; x < gridWidth; x++) {
      const row: string[] = [];
      for (let y = 0; y < gridHeight; y++) {
        const adjacentMines = calculateAdjacentMines([x, y], minesToSet);
        row.push(adjacentMines);
      }
      valuesToSet.push(row);
    }
    // lay mines
    minesToSet.forEach((mine) => (valuesToSet[mine[0]][mine[1]] = "M"));

    setValueGrid(valuesToSet);
  };

  useEffect(initializeGrid, [startTime]);

  return {
    valueGrid,
  };
};

export default useValueGrid;
