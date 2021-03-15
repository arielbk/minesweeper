import useFlagGrid from 'hooks/useFlagGrid';
import useIsRevealedGrid from 'hooks/useIsRevealedGrid';
import useValueGrid from 'hooks/useValueGrid';
import { createContext, useState } from 'react';

export const GridContext = createContext({
  gridLength: 15,
  setGridLength: (dimensions: number) => {
    /* */
  },
  valueGrid: [['M']],
  isRevealedGrid: [[false]],
  flagGrid: [[false]],
  handleRevealCells: (cell: [number, number][]) => {
    /* */
  },
  handleFlagCell: (cell: [number, number]) => {
    /* */
  },
});

export const GridProvider: React.FC = ({ children }) => {
  const [gridLength, setGridLength] = useState<number>(15);
  const gridWidth = gridLength;
  const gridHeight = gridLength;

  //grid values
  const gridParams = { gridWidth, gridHeight, startTime };
  const { valueGrid, mineLocations } = useValueGrid(gridParams);
  const { isRevealedGrid, handleRevealCells } = useIsRevealedGrid(gridParams);
  const { flagGrid, handleFlagCell, flagCount } = useFlagGrid({
    ...gridParams,
    mineCount: mineLocations.length,
  });

  return (
    <GridContext.Provider
      value={{
        gridLength,
        setGridLength,
        valueGrid,
        isRevealedGrid,
        flagGrid,
        handleRevealCells,
        handleFlagCell,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
