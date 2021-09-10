import { Box, Flex } from '@chakra-ui/layout';
import { GameContext } from 'contexts/GameContext';
import { GridContext } from 'contexts/GridContext';
import React, { useContext } from 'react';
import { IoGridSharp } from 'react-icons/io5';

const Settings: React.FC = () => {
  const { startTime, gameState } = useContext(GameContext);
  const { gridLength, setGridLength } = useContext(GridContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDimensions = Number(e.target.value);
    setGridLength(newDimensions);
  };

  if (!startTime && !gameState?.matches('running')) return <div />;
  return (
    <Flex
      alignItems="center"
      pb="2rem"
      position="absolute"
      right="0"
      top={-4}
      transform="translateX(-50%)"
      fontFamily="Courier, Monospace"
      fontSize="1.4rem"
    >
      <Box fontSize="1.5rem" display="inline-block" mr={4} color="#ddd">
        <label htmlFor="grid-dimensions">
          <IoGridSharp />{' '}
        </label>
      </Box>
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
    </Flex>
  );
};

export default Settings;
