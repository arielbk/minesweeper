import { useState, useEffect, useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const calculateAdjacentMines = (
  loc: number[],
  mines: [number, number][]
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

const isCoordinateAdjacent = (
  center: [number, number],
  toCheck: [number, number]
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

const useGrid = ({ width, height }: { width: number; height: number }) => {
  // 2d array, number of mines or mine
  const [valueGrid, setValueGrid] = useState<string[][]>([[]]);
  // 2d array, number of mines
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(height).fill(new Array(width).fill(false))
  );
  // game context
  const { startTime } = useContext(GameContext);

  // initializes grid values
  const initializeGrid = () => {
    setIsRevealedGrid(new Array(height).fill(new Array(width).fill(false)));

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

  // find an area of safe cells (including border cells)
  const findContiguousArea = (x: number, y: number): [number, number][] => {
    const areaCells: [number, number][] = [];
    let scanX = x;

    // add touching coordinates of the current line
    let isLeftChecked = false;
    while (true) {
      // check the left side
      if (valueGrid[y][scanX] === "0") areaCells.push([scanX, y]);
      else if (isLeftChecked) break;
      else {
        scanX = x;
        isLeftChecked = true;
      }
      if (isLeftChecked) scanX += 1;
      else scanX -= 1;
    }

    // scan upper and lower lines for touching coordinates
    let prevAreaRow: [number, number][] = areaCells;
    // start one line above toCheck
    let scanY = y - 1;
    // if checking upper is done
    let isUpperDone = false;

    // iterate through upper then lower rows until none are touching
    while (prevAreaRow.length || !isUpperDone) {
      // current row area to push to
      let rowArea: [number, number][] = [];

      // any free cells on current row
      let rowFree: [number, number][] = [];
      if (valueGrid[scanY])
        valueGrid[scanY].forEach((val, i) => {
          if (val === "0") rowFree.push([i, scanY]);
        });

      rowFree.forEach((freeCell) => {
        const isArea = prevAreaRow.some((areaCell) =>
          isCoordinateAdjacent(areaCell, freeCell)
        );
        if (isArea) rowArea.push(freeCell);
      });

      // push the current previous row into the area and create a new prev
      prevAreaRow.forEach((cell) => areaCells.push(cell));

      if (!rowArea.length && !isUpperDone) {
        isUpperDone = true;
        prevAreaRow = areaCells;
      } else {
        prevAreaRow = rowArea;
      }

      if (isUpperDone) scanY += 1;
      else scanY -= 1;
    }

    return areaCells;
  };

  // sets cells to revealed
  const handleRevealCells = (cells: [number, number][]): void => {
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
