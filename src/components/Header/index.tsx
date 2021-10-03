import { useContext } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { useColorMode, useTheme } from '@chakra-ui/react';
import { GameContext } from 'contexts/GameContext';
import { transparentize } from 'polished';
import Settings from './Settings';

const Header: React.FC = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  const { handleRestart } = useContext(GameContext);
  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      height="90px"
      width="100vw"
      background={
        colorMode === 'light'
          ? transparentize(0.4, 'white')
          : transparentize(0.4, theme.colors.darkBg[500])
      }
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx="auto"
        width="min(90vw, 73vh)"
        minWidth="440px"
        height="100%"
      >
        <Heading mb={0} onClick={handleRestart} cursor="pointer">
          Minesweeper
        </Heading>
        <Settings />
      </Flex>
    </Box>
  );
};

export default Header;
