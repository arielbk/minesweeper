import { Box, Flex } from '@chakra-ui/react';
import Header from 'components/Header';
import { GridProvider } from 'contexts/GridContext';
import React from 'react';
import Grid from './components/common/Grid';
import Controls from './components/Controls';
import { GameProvider } from './contexts/GameContext';

export const responsiveWidth = 'min(90vw, 73vh)';

const App: React.FC = () => {
  return (
    <GridProvider>
      <GameProvider>
        <Header />
        <Flex
          mx="auto"
          mt="90px"
          width={responsiveWidth}
          userSelect="none"
          height="calc(100vh - 90px)"
          // vertically center the game content for mobile view
          sx={{
            '@media(max-width: 600px)': {
              alignItems: 'center',
              marginTop: 45,
            },
          }}
        >
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
