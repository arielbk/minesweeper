import { useCallback, useState } from 'react';
import {
  calculateAdjacentMineCount,
  getAdjacentCellCoordinates,
} from 'utilities/mineCoordinates';
import { Coordinate } from 'utilities/types';

interface GridParams {
  gridLength: number;
}

interface ValueGrid {
  valueGrid: string[][];
  mineLocations: Coordinate[];
  resetValues: (cell?: Coordinate) => string[][];
}

const useValueGrid = ({ gridLength }: GridParams): ValueGrid => {
  // 2d array, number of adjacent mines
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);
  // locations of all mines
  const [mineLocations, setMineLocations] = useState<Coordinate[]>([]);

  // initializes grid values
  const initializeGrid = useCallback(
    (selectedCell?: Coordinate) => {
      // determine mine locations
      const mineCount = Math.floor((gridLength * gridLength) / 6);
      const minesToSet: Coordinate[] = [];

      while (minesToSet.length < mineCount) {
        const mineLocation: Coordinate = [
          Math.floor(Math.random() * gridLength),
          Math.floor(Math.random() * gridLength),
        ];
        const isAdjacentToSelected =
          !!selectedCell &&
          [
            selectedCell,
            ...getAdjacentCellCoordinates(selectedCell, gridLength, gridLength),
          ].some(
            (cell) =>
              mineLocation[0] === cell[0] && mineLocation[1] === cell[1],
          );
        if (
          // ensure there are no duplicate mines
          !minesToSet.some(
            (mineToSet) =>
              mineToSet[0] === mineLocation[0] &&
              mineToSet[1] === mineLocation[1],
          ) &&
          !isAdjacentToSelected
        ) {
          minesToSet.push(mineLocation);
        }
      }

      setMineLocations(minesToSet);

      // populate value grid
      const valuesToSet: string[][] = [];
      for (let y = 0; y < gridLength; y++) {
        const row: string[] = [];
        for (let x = 0; x < gridLength; x++) {
          const adjacentMines = calculateAdjacentMineCount([x, y], minesToSet);
          row.push(adjacentMines);
        }
        valuesToSet.push(row);
      }
      // lay mines
      minesToSet.forEach((mine) => (valuesToSet[mine[1]][mine[0]] = 'M'));

      setValueGrid(valuesToSet);
      return valuesToSet;
    },
    [gridLength],
  );

  return { valueGrid, mineLocations, resetValues: initializeGrid };
};

export default useValueGrid;
