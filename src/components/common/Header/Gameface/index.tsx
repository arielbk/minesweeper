import React, { useContext } from "react";
import styled from "styled-components";
import { GameContext } from "../../../../contexts/GameContext";

const GamefaceTile = styled.button`
  vertical-align: top;
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 1px solid #777;
  background: #eee;
  background: linear-gradient(45deg, #eee, #ccc);
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
  const { isRunning, startTime, handleRestart } = useContext(GameContext);

  return (
    <GamefaceTile onClick={handleRestart}>
      {isRunning || !startTime ? (
        <span role="img" aria-label="start game">
          🙂
        </span>
      ) : (
        <span role="img" aria-label="new game">
          😵
        </span>
      )}
    </GamefaceTile>
  );
};

export default Gameface;
