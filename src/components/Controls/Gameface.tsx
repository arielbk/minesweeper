import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { GameContext } from '../../contexts/GameContext';

const GamefaceTile = styled.button`
  vertical-align: top;
  display: inline-block;
  width: 60px;
  height: 60px;
  outline: 0;
  color: red;
  font-size: 36px;

  &:active {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

const Gameface: React.FC = () => {
  const { gameState, handleRestart, isMouseDown } = useContext(GameContext);
  let face = '🙂';
  if (isMouseDown) face = '😮';
  if (gameState?.matches('lost')) face = '😵';
  if (gameState?.matches('won')) face = '😎';
  return (
    <GamefaceTile onClick={handleRestart}>
      <span role="img" aria-label="game face, restart game">
        {face}
      </span>
    </GamefaceTile>
  );
};

export default Gameface;
