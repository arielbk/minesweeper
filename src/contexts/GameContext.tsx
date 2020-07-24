import React, { createContext, useState, useEffect } from "react";

export const GameContext = createContext({
  /**
   * State
   */
  isRunning: false,
  startTime: 0,
  currentScore: 0,
  // todo: these could go in a settings context?
  gridWidth: 15,
  gridHeight: 15,

  /**
   * Functions
   */
  handleRestart: () => {},
});

export const GameProvider: React.FC = ({ children }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (isRunning) setStartTime(Date.now());
  }, [isRunning]);

  const handleRestart = () => {
    setIsRunning(true);
    setStartTime(Date.now());
  };

  return (
    <GameContext.Provider
      value={{
        isRunning,
        startTime,
        currentScore: 0,
        gridWidth: 15,
        gridHeight: 15,
        handleRestart,
      }}
    >
      <>{children}</>
    </GameContext.Provider>
  );
};
