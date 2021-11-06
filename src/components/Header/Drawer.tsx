import { useEffect, useContext } from 'react';
import { Flex } from '@chakra-ui/layout';
import { Portal, useColorMode } from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { responsiveWidth } from 'App';
import { GameContext } from 'contexts/GameContext';

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

const Overlay = styled(motion.div)<{ isLight: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => (props.isLight ? '#fff' : '#000')};
`;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, content }) => {
  const { colorMode } = useColorMode();
  const { togglePaused, gameState } = useContext(GameContext);
  const isPaused = gameState?.matches('paused');
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, 200], [0.5, 0]);

  // pause game when drawer is opened
  useEffect(() => {
    if (isOpen && !isPaused) {
      togglePaused();
    }
  }, [isOpen, isPaused, togglePaused]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            onClick={onClose}
            isLight={colorMode === 'light'}
            style={{ opacity }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <Container
        drag="x"
        onDragEnd={(event, info) => {
          if (info.point.x > 320) onClose();
        }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={{
          left: 0,
          right: 0.5,
        }}
        isLight={colorMode === 'light'}
        style={{ x }}
        animate={{
          x: isOpen ? 20 : 220,
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
