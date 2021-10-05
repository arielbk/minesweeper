import styled from '@emotion/styled';
import confetti from 'canvas-confetti';
import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/GameContext';

const GamefaceTile = styled.button`
  vertical-align: top;
  display: inline-block;
  width: 60px;
  height: 60px;
  outline: 0;
  color: red;
  font-size: 36px;

  &:active,
  &:focus {
    box-shadow: inset 4px 4px 8px #999;
    background: #bbb;
    outline: 0;
  }
`;

// confetti animation
function confettiFrame() {
  confetti({
    particleCount: 220,
    angle: 60,
    spread: 120,
    origin: { x: 0, y: 0.8 },
  });

  confetti({
    particleCount: 220,
    angle: 120,
    spread: 120,
    origin: { x: 1, y: 0.8 },
  });
}

const Gameface: React.FC = () => {
  const { gameState, handleRestart, isMouseDown } = useContext(GameContext);
  let face = '🙂';
  if (isMouseDown) face = '😮';
  const hasLost = gameState?.matches('lost');
  const hasWon = gameState?.matches('won');
  if (hasLost) face = '😵';
  if (hasWon) face = '😎';

  useEffect(() => {
    if (!hasWon) return;
    requestAnimationFrame(confettiFrame);
  }, [hasWon]);

  return (
    <GamefaceTile onClick={handleRestart}>
      <span role="img" aria-label="game face, restart game">
        {face}
      </span>
    </GamefaceTile>
  );
};

export default Gameface;
