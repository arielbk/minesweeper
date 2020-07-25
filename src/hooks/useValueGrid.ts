import { useState, useEffect, useContext } from "react";
import {
  calculateAdjacentMines,
  findContiguousArea,
} from "utilities/mineCoordinates";
import { GameContext } from "contexts/GameContext";

const useGrid = ({ width, height }: { width: number; height: number }) => {
  // 2d array, number of adjacent mines
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);
  // game context
  const { startTime } = useContext(GameContext);

  // initializes grid values
  const initializeGrid = () => {
    // determine mine locations
    const mineCount = Math.floor((width * height) / 6);
    const minesToSet: [number, number][] = [];

    while (minesToSet.length < mineCount) {
      const mineLocation: [number, number] = [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
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
  };

  useEffect(initializeGrid, [startTime]);

  return {
    valueGrid,
  };
};

export default useGrid;
