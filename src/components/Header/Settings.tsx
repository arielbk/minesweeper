import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Flex } from '@chakra-ui/layout';
import { GameContext } from 'contexts/GameContext';
import { GridContext } from 'contexts/GridContext';
import React, { useContext } from 'react';
import { IoGridSharp, IoMoon, IoSunny } from 'react-icons/io5';

const Settings: React.FC = () => {
  const { startTime, gameState } = useContext(GameContext);
  const { gridLength, setGridLength } = useContext(GridContext);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDimensions = Number(e.target.value);
    setGridLength(newDimensions);
  };

  if (!startTime && !gameState?.matches('running')) return <div />;
  return (
    <Flex alignItems="center">
      <Flex fontFamily="Courier, Monospace" fontSize="1.4rem">
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
          style={{
            background: 'transparent',
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </Flex>
      <IconButton
        ml={4}
        fontSize="1.4rem"
        variant="ghost"
        onClick={toggleColorMode}
        aria-label="switch color mode"
        icon={colorMode === 'light' ? <IoSunny /> : <IoMoon />}
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
      />
    </Flex>
  );
};

export default Settings;
