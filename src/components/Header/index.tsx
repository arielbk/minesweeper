import { Flex, Heading } from '@chakra-ui/layout';
import Settings from './Settings';

const Header: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      px={8}
      position="fixed"
      left="0"
      top="0"
      height="80px"
      width="100vw"
      background="whiteAlpha.600"
    >
      <Heading mb={0}>Minesweeper</Heading>
      <Settings />
    </Flex>
  );
};

export default Header;
