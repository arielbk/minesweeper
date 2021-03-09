import React, { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { GameContext } from 'contexts/GameContext';
import Gameface from './Gameface';

const Container = styled.div`
  margin: 2rem auto;
  width: 600px;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NumberField = styled.div`
  background: #333;
  color: #ed0100;
  text-align: right;
  width: 120px;
  padding: 5px 10px;
  font-size: 30px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
`;

const Header: React.FC = () => {
  const { flagCount, startTime, isWinner, isDead } = useContext(GameContext);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const intervalId = useRef<number>();

  useEffect(() => {
    if (isWinner || isDead) return clearInterval(intervalId.current);
    intervalId.current = (setInterval(() => {
      const newTime = Math.floor((Date.now() - startTime) / 1000);
      setTimeElapsed(newTime);
    }, 1000) as unknown) as number;
    return () => clearInterval(intervalId.current);
  }, [startTime, isWinner, isDead]);

  return (
    <Container>
      <NumberField>{flagCount}</NumberField>
      <Gameface />
      <NumberField>{timeElapsed}</NumberField>
    </Container>
  );
};

export default Header;
