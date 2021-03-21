import useFlagGrid from 'hooks/useFlagGrid';
import useIsRevealedGrid from 'hooks/useIsRevealedGrid';
import useValueGrid from 'hooks/useValueGrid';
import { createContext, useEffect, useState } from 'react';

export const GridContext = createContext({
  gridLength: 15,
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
  const [gridLength, setGridLength] = useState<number>(15);

  //grid values
  const gridParams = { gridLength };
  const { valueGrid, mineLocations, reset: resetValues } = useValueGrid(
    gridParams,
  );
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

  const resetGrids = () => {
    resetValues();
    resetRevealed();
    resetFlags();
  };

  // reset grids on start or settings change
  useEffect(() => {
    resetGrids();
  }, [gridLength]);

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
