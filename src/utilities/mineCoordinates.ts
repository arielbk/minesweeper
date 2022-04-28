import { Coordinate } from './types';

export const calculateAdjacentMineCount = (
  loc: number[],
  mines: Coordinate[],
): string => {
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

export const isCoordinateAdjacent = (
  center: Coordinate,
  toCheck: Coordinate,
): boolean => {
  return (
    (toCheck[0] === center[0] ||
      toCheck[0] === center[0] - 1 ||
      toCheck[0] === center[0] + 1) &&
    (toCheck[1] === center[1] ||
      toCheck[1] === center[1] - 1 ||
      toCheck[1] === center[1] + 1)
  );
};

// returns adjacent coordinates that are still within the grid
const getAdjacentCellCoordinates = (
  [x, y]: Coordinate,
  width: number,
  height: number,
): Coordinate[] => {
  // begin with all adjacent coordinates
  const coordinates: Coordinate[] = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];
  return coordinates.filter(
    (coordinate) =>
      coordinate[0] >= 0 &&
      coordinate[0] < width &&
      coordinate[1] >= 0 &&
      coordinate[1] < height,
  );
};

// start this find contiguous area
export const findContiguousArea = (
  [x, y]: Coordinate,
  valueGrid: string[][],
): Coordinate[] => {
  // starts with the current cell to be revealed
  const cellsToReveal: Coordinate[] = [[x, y]];
  const cellsToCheck: Coordinate[] = [[x, y]];
  const cellsChecked: Coordinate[] = [];

  const isEmptyCell = (cell: Coordinate): boolean => {
    return valueGrid[cell[1]][cell[0]] === '0';
  };

  const getRemainingCells = (toCheck: Coordinate[]) =>
    toCheck
      .map((cell) => JSON.stringify(cell))
      .filter(
        (cell) =>
          !cellsChecked.map((cell) => JSON.stringify(cell)).includes(cell),
      )
      .map((cell) => JSON.parse(cell));

  let remainingCells = getRemainingCells(cellsToCheck);

  while (remainingCells.length > 0) {
    remainingCells.forEach((currentCell) => {
      const adjacentCells = getAdjacentCellCoordinates(
        [currentCell[0], currentCell[1]],
        valueGrid[0].length,
        valueGrid.length,
      );

      // get adjacent cells if the current one is empty
      adjacentCells.forEach((cell) => {
        // all adjacent cells are revealed
        if (!cellsToReveal.includes(cell)) cellsToReveal.push(cell);
        // empty adjacent cells are checked
        if (isEmptyCell(cell) && !cellsToCheck.includes(cell))
          cellsToCheck.push(cell);
      });

      // add current cell to checked cells
      cellsChecked.push(currentCell);
    });
    // determines if the loop should run again
    remainingCells = getRemainingCells(cellsToCheck);
  }

  return cellsToReveal;
};
