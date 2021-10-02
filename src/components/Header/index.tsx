import { Flex, Heading } from '@chakra-ui/layout';
import { useColorMode, useTheme } from '@chakra-ui/react';
import { transparentize } from 'polished';
import Settings from './Settings';

const Header: React.FC = () => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px={8}
      pt={4}
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
      <Heading mb={0}>Minesweeper</Heading>
      <Settings />
    </Flex>
  );
};

export default Header;
