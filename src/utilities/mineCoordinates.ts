export const calculateAdjacentMines = (
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

export const isCoordinateAdjacent = (
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

// find an area of safe cells (including border cells)
export const findContiguousArea = (
  [x, y]: [number, number],
  valueGrid: string[][]
): [number, number][] => {
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
