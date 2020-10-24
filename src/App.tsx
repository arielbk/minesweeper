import React from "react";
import { GameProvider } from "./contexts/GameContext";
import Grid from "./components/common/Grid";
import Header from "./components/common/Header";
import Settings from "components/common/Settings";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <GameProvider>
      <Header />
      <Grid />
      <Settings />
    </GameProvider>
  );
};

export default App;
