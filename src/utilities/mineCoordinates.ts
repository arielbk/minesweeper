export const calculateAdjacentMineCount = (
  loc: number[],
  mines: [number, number][],
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
  toCheck: [number, number],
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
  [x, y]: [number, number],
  width: number,
  height: number,
): [number, number][] => {
  // begin with all adjacent coordinates
  const coordinates: [number, number][] = [
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

// find an area of safe cells (including border cells)
export const findContiguousArea = (
  [x, y]: [number, number],
  valueGrid: string[][],
): [number, number][] => {
  const areaCells: [number, number][] = [];
  let scanX: number = x;

  // add touching coordinates of the current line
  let isLeftChecked = false;
  while (true) {
    // check the left side
    if (valueGrid[y][scanX] === '0' && !areaCells.includes([scanX, y]))
      areaCells.push([scanX, y]);
    // if not an empty cell
    else {
      // finish current line scan
      if (isLeftChecked) break;
      // move to right side
      else {
        scanX = x;
        isLeftChecked = true;
      }
    }
    // move left or right (depending on flag)
    if (isLeftChecked) scanX += 1;
    else scanX -= 1;
  }

  // scan upper and lower lines for touching coordinates
  let prevAreaRow: [number, number][] = areaCells;
  // start one line above toCheck
  let scanY: number = y - 1;
  // if checking upper is done
  let isUpperDone = false;

  // iterate through upper then lower rows until none are touching
  while (prevAreaRow.length || !isUpperDone) {
    // current row area to push to
    const rowArea: [number, number][] = [];

    // collate connected empty cells
    if (valueGrid[scanY])
      valueGrid[scanY].forEach((val, i) => {
        if (val !== '0') return;
        const freeCell: [number, number] = [i, scanY];
        const isArea = prevAreaRow.some((areaCell) =>
          isCoordinateAdjacent(areaCell, freeCell),
        );
        if (isArea) rowArea.push(freeCell);
      });

    // push the current previous row into the area and create a new prev
    prevAreaRow
      .filter((cell) => !areaCells.includes(cell))
      .forEach((cell) => {
        areaCells.push(cell);
        // add any adjacent cells
        getAdjacentCellCoordinates(
          [cell[0], cell[1]],
          valueGrid[0].length,
          valueGrid.length,
        )
          .filter((coordinate) => !areaCells.includes(coordinate))
          .forEach((coordinate) => areaCells.push(coordinate));
      });

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
