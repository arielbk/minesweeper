import useFlagGrid from 'hooks/useFlagGrid';
import useIsRevealedGrid from 'hooks/useIsRevealedGrid';
import useLocalStorage from 'hooks/useLocalStorage';
import useValueGrid from 'hooks/useValueGrid';
import React, { createContext, useCallback, useEffect } from 'react';
import { Coordinate } from 'utilities/types';

type GridContent = {
  gridLength: number;
  setGridLength: (dimensions: number) => void;
  valueGrid: string[][];
  mineLocations: Coordinate[];
  isRevealedGrid: boolean[][];
  flagGrid: boolean[][];
  flagCount: number;
  handleRevealCells: (cell: Coordinate[]) => void;
  handleFlagCell: (cell: Coordinate) => void;
  resetGrids: () => void;
};

export const GridContext = createContext({} as GridContent);

export const GridProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gridLength, setGridLength] = useLocalStorage<number>(
    'minesweeper-grid-length',
    10,
  );

  //grid values
  const gridParams = { gridLength };
  const {
    valueGrid,
    mineLocations,
    reset: resetValues,
  } = useValueGrid(gridParams);
  const {
    isRevealedGrid,
    handleRevealCells,
    reset: resetRevealed,
  } = useIsRevealedGrid(gridParams);
  const {
    flagGrid,
    handleFlagCell,
    flagCount,
    reset: resetFlags,
  } = useFlagGrid({
    ...gridParams,
    mineCount: mineLocations.length,
  });

  const resetGrids = useCallback(() => {
    resetValues();
    resetRevealed();
    resetFlags();
  }, [resetValues, resetRevealed, resetFlags]);

  // reset grids on start or settings change
  useEffect(() => {
    resetGrids();
  }, [gridLength, resetGrids]);

  return (
    <GridContext.Provider
      value={{
        gridLength,
        setGridLength,
        valueGrid,
        mineLocations,
        isRevealedGrid,
        flagGrid,
        flagCount,
        handleRevealCells,
        handleFlagCell,
        resetGrids,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
