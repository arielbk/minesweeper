import { Box } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import { format } from 'date-fns';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { MdFlag } from 'react-icons/md';
import Gameface from './Gameface';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const NumberField = styled.div`
  width: 120px;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
`;

const Controls: React.FC = () => {
  const {
    gameState,
    flagCount,
    startTime,
    toggleFlagMode,
    isFlagMode,
    timeElapsed,
    setTimeElapsed,
    togglePaused,
  } = useContext(GameContext);
  const intervalId = useRef<number>();
  const [currentTimeElapsed, setCurrentTimeElapsed] = useState<number>(0);

  const isRunning = gameState?.matches('running');

  useEffect(() => {
    if (!isRunning) {
      clearInterval(intervalId.current);
      setTimeElapsed(
        gameState?.matches('fresh') ? 0 : timeElapsed + currentTimeElapsed,
      );
      return setCurrentTimeElapsed(0);
    }

    intervalId.current = setInterval(() => {
      const newTime = Date.now() - startTime;
      setCurrentTimeElapsed(newTime);
    }, 200) as unknown as number;

    return () => clearInterval(intervalId.current);
  }, [
    startTime,
    gameState,
    isRunning,
    setCurrentTimeElapsed,
    setTimeElapsed,
    timeElapsed,
    currentTimeElapsed,
  ]);

  return (
    <Container>
      <NumberField>
        <Button
          variant="ghost"
          fontSize="30px"
          py={6}
          textAlign="center"
          onClick={() => {
            if (!isRunning) togglePaused();
            toggleFlagMode();
            throw new Error('Fake error for Sentry test');
          }}
        >
          {flagCount}
          <Box
            display="inline-block"
            fontSize="1.2rem"
            ml={2}
            color={isFlagMode ? '#f00' : '#ddd'}
          >
            <MdFlag />
          </Box>
        </Button>
      </NumberField>
      <Gameface />
      <NumberField style={{ textAlign: 'right' }}>
        <Button
          variant="ghost"
          fontSize="30px"
          py={6}
          textAlign="center"
          onClick={togglePaused}
        >
          {format(timeElapsed + currentTimeElapsed, 'm:ss')}
        </Button>
      </NumberField>
    </Container>
  );
};

export default Controls;
