import React, { useContext } from 'react';
import { GameContext } from 'contexts/GameContext';
import { Box } from '@chakra-ui/layout';
import { GridContext } from 'contexts/GridContext';

const Settings: React.FC = () => {
  const { startTime, isDead, isWinner } = useContext(GameContext);
  const { gridLength, setGridLength } = useContext(GridContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDimensions = Number(e.target.value);
    setGridLength(newDimensions);
  };

  if (!startTime && !isDead && !isWinner) return <div />;
  return (
    <Box pb="2rem" position="absolute" left="50%" transform="translateX(-50%)">
      <label htmlFor="grid-dimensions">Grid dimensions: </label>
      <select
        name="grid-dimensions"
        value={gridLength}
        id="grid-dimensions"
        onChange={handleChange}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
      </select>
    </Box>
  );
};

export default Settings;
