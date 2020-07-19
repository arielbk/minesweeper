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
          // isRevealed={true}
          onRevealCell={() => onRevealCell(x, y)}
        />
      ))}
    </StyledRow>
  );
};

const calculateDistance = (location: number[], mines: number[][]): number => {
  let closest = 99;
  mines.forEach((mine) => {
    const distance = Math.max(
      Math.abs(location[0] - mine[0]),
      Math.abs(location[1] - mine[1])
    );
    if (closest > distance) closest = distance;
  });
  return closest;
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
    const minesToPlace = [];
    for (let i = 0; i < mineCount; i++) {
      minesToPlace.push([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]);
    }
    setMines(minesToPlace);
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
        const distance: number = calculateDistance([x, y], mines);
        row.push({ value: String(distance), isRevealed: false });
      }
      matrixGrid.push(row);
    }
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
