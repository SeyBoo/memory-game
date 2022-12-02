import { useGame } from "../common/hooks/useIsInGame";
import { FunctionComponent } from "react";
import Game from "./Game";
import Home from "./Home";

const App: FunctionComponent = () => {
  const { gameData } = useGame();

  if (gameData.gridValue.length > 1) return <Game />;

  return <Home />;
};

export default App;
