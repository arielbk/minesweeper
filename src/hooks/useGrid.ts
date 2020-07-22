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

  // find an area of safe cells (including border cells)
  const findContiguousArea = (x: number, y: number): number[][] => {
    const areaCells: number[][] = [];
    let currentX = x;
    let currentY = y;

    // add touching coordinates of the current line
    while (true) {
      // check the left side
      if (valueGrid[currentY][currentX] === "0") areaCells.push([currentX, y]);
      else {
        areaCells.push([currentX, y]);
        break;
      }
      currentX -= 1;
    }
    currentX = x;
    while (true) {
      // check the right side
      if (valueGrid[currentY][currentX] === "0") areaCells.push([currentX, y]);
      else {
        areaCells.push([currentX, y]);
        break;
      }
      currentX += 1;
    }

    // initialise with the origin row
    let prevAreaRow: number[][] = areaCells;
    // if checking upper is done
    let isUpperDone = false;
    // start one line above origin
    currentY -= 1;

    // iterate through upper then lower rows until none are touching
    while (prevAreaRow.length || !isUpperDone) {
      // current row area to push to
      let rowArea: number[][] = [];

      // any free cells on current row
      let rowFree: number[][] = [];
      if (valueGrid[currentY])
        valueGrid[currentY].forEach((val, i) => {
          if (val === "0") rowFree.push([i, currentY]);
        });

      rowFree.forEach((freeCell) => {
        const isArea = prevAreaRow.some(
          (areaCell) =>
            (freeCell[0] === areaCell[0] ||
              freeCell[0] === areaCell[0] - 1 ||
              freeCell[0] === areaCell[0] + 1) &&
            (freeCell[1] === areaCell[1] ||
              freeCell[1] === areaCell[1] - 1 ||
              freeCell[1] === areaCell[1] + 1)
        );
        if (isArea) rowArea.push(freeCell);
      });

      // push the current previous row into the area and create a new prev
      prevAreaRow.forEach((cell) => {
        areaCells.push(cell);
        const [x, y] = cell;
        // if (x > 0 && y > 0) areaCells.push([x - 1, y - 1]);
        // if (y > 0) areaCells.push([x, y - 1]);
        // if (x < width - 1 && y > 0) areaCells.push([x + 1, y - 1]);
        // if (x > 0) areaCells.push([x - 1, y]);
        // if (x < width - 1) areaCells.push([x + 1, y]);
        // if (x > 0 && y < height - 1) areaCells.push([x - 1, y + 1]);
        // if (y < height - 1) areaCells.push([x, y + 1]);
        // if (x < width - 1 && y < height - 1) areaCells.push([x + 1, y + 1]);
      });

      if (!rowArea.length && !isUpperDone) {
        isUpperDone = true;
        prevAreaRow = areaCells;
      } else {
        prevAreaRow = rowArea;
      }

      if (isUpperDone) currentY += 1;
      else currentY -= 1;
    }

    return areaCells;
  };

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
    const toReveal = findContiguousArea(x, y);
    handleRevealCells(toReveal);
  };

  return {
    valueGrid,
    isRevealedGrid,
    handleSelectCell,
  };
};

export default useGrid;
