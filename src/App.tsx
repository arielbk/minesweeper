import React from "react";
import { GameProvider } from "./contexts/GameContext";
import Grid from "./components/common/Grid";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <GameProvider>
      <Grid />
    </GameProvider>
  );
};

export default App;
