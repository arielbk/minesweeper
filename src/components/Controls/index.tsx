import styled from '@emotion/styled';
import { GameContext } from 'contexts/GameContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    if (gameState?.matches('running')) return clearInterval(intervalId.current);
    intervalId.current = (setInterval(() => {
      const newTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(newTime);
    }, 1000) as unknown) as number;
    return () => clearInterval(intervalId.current);
  }, [startTime, gameState]);

  return (
    <Container>
      <NumberField>{flagCount}</NumberField>
      <Gameface />
      <NumberField style={{ textAlign: 'right' }}>{timeElapsed}</NumberField>
    </Container>
  );
};

export default Controls;
