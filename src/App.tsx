import React from 'react';
import { GameProvider } from './contexts/GameContext';
import Grid from './components/common/Grid';
import Controls from './components/Controls';
import Settings from 'components/Settings';
import { Box, Heading } from '@chakra-ui/layout';
import { GridProvider } from 'contexts/GridContext';

const App: React.FC = () => {
  return (
    <GridProvider>
      <GameProvider>
        <Box mx="auto" my="3rem" width="500px">
          <Heading mb={0}>Minesweeper</Heading>
          <Grid />
          <Controls />
        </Box>
        <Settings />
      </GameProvider>
    </GridProvider>
  );
};

export default App;
