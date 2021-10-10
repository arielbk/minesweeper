import useFlagGrid from 'hooks/useFlagGrid';
import useIsRevealedGrid from 'hooks/useIsRevealedGrid';
import useLocalStorage from 'hooks/useLocalStorage';
import useValueGrid from 'hooks/useValueGrid';
import { createContext, useCallback, useEffect } from 'react';

export const GridContext = createContext({
  gridLength: 10,
  setGridLength: (dimensions: number) => {
    /* */
  },
  valueGrid: [['M']],
  mineLocations: [[0, 0]],
  isRevealedGrid: [[false]],
  flagGrid: [[false]],
  flagCount: 15,
  handleRevealCells: (cell: [number, number][]) => {
    //
  },
  handleFlagCell: (cell: [number, number]) => {
    //
  },
  resetGrids: () => {
    //
  },
});

export const GridProvider: React.FC = ({ children }) => {
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
