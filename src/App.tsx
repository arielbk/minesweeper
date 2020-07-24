import React from "react";
import { GameProvider } from "./contexts/GameContext";
import Grid from "./components/common/Grid";
import Header from "./components/common/Header";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <GameProvider>
      <Header />
      <Grid />
    </GameProvider>
  );
};

export default App;
