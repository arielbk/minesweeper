import { useState, useEffect, useContext } from "react";
import { GameContext } from "contexts/GameContext";

const useIsRevealedGrid = () => {
  const { gridWidth, gridHeight, startTime } = useContext(GameContext);
  const [isRevealedGrid, setIsRevealedGrid] = useState<boolean[][]>(
    new Array(gridHeight).fill(new Array(gridWidth).fill(false))
  );

  useEffect(() => {
    setIsRevealedGrid(
      new Array(gridHeight).fill(new Array(gridWidth).fill(false))
    );
  }, [gridHeight, gridWidth, startTime]);

  // sets cells to revealed
  const handleRevealCells = (cells: [number, number][]): void => {
    const isRevealedCopy = isRevealedGrid.map((row) => row.map((col) => col));
    cells.forEach(([x, y]) => {
      isRevealedCopy[y][x] = true;
    });
    setIsRevealedGrid(isRevealedCopy);
  };

  return {
    isRevealedGrid,
    handleRevealCells,
  };
};

export default useIsRevealedGrid;
