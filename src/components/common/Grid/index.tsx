import React, { useContext } from "react";
import Cell from "../Cell";
import styled from "styled-components";
import { GameContext } from "contexts/GameContext";
import useValueGrid from "hooks/useValueGrid";
import useIsRevealedGrid from "hooks/useIsRevealedGrid";
import { findContiguousArea } from "utilities/mineCoordinates";
import useFlagGrid from "hooks/useFlagGrid";

const StyledRow = styled.div`
  display: block;
  margin: 0;
  padding: 0;
  height: 30px;
`;

interface RowProps {
  y: number;
  valueRow: string[];
  isRevealedRow: boolean[];
  onRevealCell: (x: number, y: number) => void;
  flagRow: boolean[];
  onFlagCell: (cell: [number, number]) => void;
}

const Row: React.FC<RowProps> = ({
  y,
  valueRow,
  isRevealedRow,
  onRevealCell,
  flagRow,
  onFlagCell,
}) => {
  return (
    <StyledRow>
      {valueRow.map((cell, x) => (
        <Cell
          value={cell}
          isRevealed={isRevealedRow[x]}
          isFlagged={flagRow[x]}
          onFlagCell={(e) => {
            e.preventDefault();
            onFlagCell([x, y]);
          }}
          onRevealCell={() => onRevealCell(x, y)}
        />
      ))}
    </StyledRow>
  );
};

const Container = styled.div<{ width: number; height: number }>`
  margin: 2rem auto;
  box-sizing: content-box;
  border: 2px solid #bbb;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`;

const Grid: React.FC = () => {
  const { gridWidth, gridHeight } = useContext(GameContext);
  const { valueGrid } = useValueGrid({
    width: gridWidth,
    height: gridHeight,
  });
  const { isRevealedGrid, handleRevealCells } = useIsRevealedGrid();
  const { flagGrid, handleFlagCell } = useFlagGrid();

  // determines what to do with selected cell
  const handleSelectCell = (x: number, y: number) => {
    if (isRevealedGrid[y][x] === true) return;
    if (valueGrid[y][x] !== "0") return handleRevealCells([[x, y]]);
    const toReveal = findContiguousArea([x, y], valueGrid);
    handleRevealCells(toReveal);
  };

  return (
    <Container width={gridWidth * 30} height={gridHeight * 30}>
      {valueGrid.map((row, i) => (
        <Row
          y={i}
          valueRow={row}
          isRevealedRow={isRevealedGrid[i]}
          flagRow={flagGrid[i]}
          onFlagCell={handleFlagCell}
          key={i}
          onRevealCell={handleSelectCell}
        />
      ))}
    </Container>
  );
};

export default Grid;
