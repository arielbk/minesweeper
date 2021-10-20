import { Flex } from '@chakra-ui/layout';
import { Portal, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { responsiveWidth } from 'App';

const Container = styled(motion.div)<{ isLight: boolean }>`
  height: 100vh;
  width: 200px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  border-left: 1px solid
    ${(props) =>
      props.isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255, 255, 255, 0.3)'};
  background: ${(props) =>
    props.isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'};
  backdrop-filter: blur(12px);
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, content }) => {
  const { colorMode } = useColorMode();
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
        isLight={colorMode === 'light'}
        animate={{
          x: isOpen ? '10%' : '110%',
        }}
      >
        <Flex
          my="90px"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
          fontSize="2rem"
          height={responsiveWidth}
        >
          {content}
        </Flex>
      </Container>
    </Portal>
  );
};

export default Drawer;
