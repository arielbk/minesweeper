import React from 'react';
import { GameProvider } from './contexts/GameContext';
import Grid from './components/common/Grid';
import Controls from './components/Controls';
import Settings from 'components/Settings';
import Header from 'components/Header';
import { Box } from '@chakra-ui/layout';

const App: React.FC = () => {
  return (
    <GameProvider>
      <Box mx="auto" my="3rem" width="600px">
        <Header />
        <Grid />
        <Controls />
        <Settings />
      </Box>
    </GameProvider>
  );
};

export default App;
