import { Flex } from '@chakra-ui/layout';
import { Portal, useColorMode, useTheme } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled(motion.div)<{ background: string }>`
  background: ${(props) => props.background};
  height: 100vh;
  width: 200px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
`;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, content }) => {
  const { colorMode } = useColorMode();
  const theme = useTheme();
  return (
    <Portal>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        />
      )}
      <Container
        background={colorMode === 'light' ? '#fff' : theme.colors.darkBg[500]}
        animate={{
          x: isOpen ? '10%' : '110%',
        }}
      >
        <Flex
          py={16}
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
          height="250px"
        >
          {content}
        </Flex>
      </Container>
    </Portal>
  );
};

export default Drawer;
