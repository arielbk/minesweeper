import { Box, Flex } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import { format } from 'date-fns';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MdFlag } from 'react-icons/md';
import Gameface from './Gameface';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NumberField = styled.div`
  width: 120px;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
`;

const Controls: React.FC = () => {
  const { gameState, flagCount, startTime } = useContext(GameContext);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalId = useRef<number>();

  const isRunning = gameState?.matches('running');

  useEffect(() => {
    if (!isRunning) return clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      const newTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(newTime);
    }, 200) as unknown as number;
    return () => clearInterval(intervalId.current);
  }, [startTime, gameState, isRunning]);

  return (
    <Container>
      <NumberField>
        <Flex align="center">
          {flagCount}
          <Box display="inline-block" fontSize="1.2rem" ml={2} color="#ddd">
            <MdFlag />
          </Box>
        </Flex>
      </NumberField>
      <Gameface />
      <NumberField style={{ textAlign: 'right' }}>
        {format(timeElapsed * 1000, 'm:ss')}
      </NumberField>
    </Container>
  );
};

export default Controls;
