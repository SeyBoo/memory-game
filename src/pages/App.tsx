import { FunctionComponent } from "react";
import Game from "./Game";
import Home from "./Home";
import { useAppSelector } from "../common/hooks/useStore";

const App: FunctionComponent = () => {
  const gameData = useAppSelector((state) => state.game.gameData);

  if (gameData) return <Game />;

  return <Home />;
};

export default App;
