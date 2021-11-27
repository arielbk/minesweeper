import { IconButton } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Flex } from '@chakra-ui/layout';
import { GridContext } from 'contexts/GridContext';
import React, { useContext, useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoGridSharp, IoMoon, IoSunny } from 'react-icons/io5';
import { BsAwardFill } from 'react-icons/bs';
import Drawer from './Drawer';

const Settings: React.FC = () => {
  const { gridLength, setGridLength } = useContext(GridContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDimensions = Number(e.target.value);
    setGridLength(newDimensions);
  };

  const content = (
    <>
      <Flex fontFamily="Courier, Monospace">
        <Box display="inline-block" mr={4} color="#ddd">
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
        variant="ghost"
        onClick={() => console.log('high scores')}
        aria-label="show high scores"
        icon={<BsAwardFill />}
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
        fontSize="inherit"
      />
      <IconButton
        ml={4}
        variant="ghost"
        onClick={toggleColorMode}
        aria-label="switch color mode"
        icon={colorMode === 'light' ? <IoSunny /> : <IoMoon />}
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
        fontSize="inherit"
      />
    </>
  );

  return (
    <>
      <Flex
        alignItems="center"
        sx={{
          '@media (max-width: 500px)': {
            display: 'none',
          },
        }}
        fontSize="1.5rem"
      >
        {content}
      </Flex>
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        variant="ghost"
        fontSize="1.8rem"
        sx={{
          '@media (min-width: 500px)': {
            display: 'none',
          },
        }}
        aria-label="open menu"
        _focus={{ boxShadow: 'none', outline: '2px solid #ccc ' }}
        icon={<HiMenuAlt3 />}
      />
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        content={content}
      />
    </>
  );
};

export default Settings;
