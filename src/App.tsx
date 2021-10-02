import { Box, Flex } from '@chakra-ui/layout';
import Header from 'components/Header';
import { GridProvider } from 'contexts/GridContext';
import React from 'react';
import Grid from './components/common/Grid';
import Controls from './components/Controls';
import { GameProvider } from './contexts/GameContext';

const App: React.FC = () => {
  return (
    <GridProvider>
      <GameProvider>
        <Header />
        <Flex mx="auto" mt="80px" width="500px">
          <Box>
            <Grid />
            <Controls />
          </Box>
        </Flex>
      </GameProvider>
    </GridProvider>
  );
};

export default App;
