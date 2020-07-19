import React, { useState, useEffect } from "react";
import Cell from "../Cell";
import styled from "styled-components";

const StyledRow = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  height: 30px;
`;

interface RowProps {
  y: number;
  row: {
    value: string;
    isRevealed: boolean;
  }[];
  onRevealCell: (x: number, y: number) => void;
}

const Row: React.FC<RowProps> = ({ y, row, onRevealCell }) => {
  return (
    <StyledRow>
      {row.map((cell, x) => (
        <Cell
          value={String(cell.value)}
          isRevealed={cell.isRevealed}
          onRevealCell={() => onRevealCell(x, y)}
        />
      ))}
    </StyledRow>
  );
};

const calculateAdjacentMines = (loc: number[], mines: number[][]): number => {
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
  return count;
};

const Container = styled.div<{ width: number; height: number }>`
  margin: 2rem auto;
  box-sizing: content-box;
  border: 2px solid #bbb;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

interface Props {
  width: number;
  height: number;
}

const Grid: React.FC<Props> = ({ width, height }) => {
  // TODO: grid logic goes into a hook
  const [matrix, setMatrix] = useState([[{ value: "", isRevealed: false }]]);
  const [mines, setMines] = useState([[0, 1]]);

  useEffect(() => {
    const mineCount = Math.floor((width * height) / 6);
    const minesToSet: number[][] = [];
    while (minesToSet.length < mineCount) {
      const toPush = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ];
      if (!minesToSet.includes(toPush)) minesToSet.push(toPush);
    }
    setMines(minesToSet);
  }, [height, width]);

  useEffect(() => {
    if (mines.length === 1) return;

    const matrixGrid: {
      value: string;
      isRevealed: boolean;
    }[][] = [];

    for (let x = 0; x < width; x++) {
      const row = [];
      for (let y = 0; y < height; y++) {
        const adjacent: number = calculateAdjacentMines([x, y], mines);
        row.push({ value: String(adjacent), isRevealed: false });
      }
      matrixGrid.push(row);
    }
    mines.forEach((mine) => (matrixGrid[mine[0]][mine[1]].value = "B"));
    setMatrix(matrixGrid);
  }, [height, mines, width]);

  const handleRevealCell = (x: number, y: number) => {
    const matrixCopy = [...matrix];
    const rowCopy = matrixCopy[y];
    const cell = { ...rowCopy[x] };
    cell.isRevealed = true;
    rowCopy[x] = cell;
    matrixCopy[y] = rowCopy;
    setMatrix(matrixCopy);
  };

  return (
    <Container width={width * 30} height={height * 30}>
      {matrix.map((row, i) => (
        <Row y={i} row={row} key={i} onRevealCell={handleRevealCell} />
      ))}
    </Container>
  );
};

export default Grid;
