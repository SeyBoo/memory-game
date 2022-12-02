import {
  gridSizeI,
  playerCountI,
  themeI,
  useGame,
} from "../common/hooks/useIsInGame";
import {
  FormEvent,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";

interface AppButtonProps {
  onClick: () => void;
  selected: boolean;
}

const AppButton: FunctionComponent<PropsWithChildren<AppButtonProps>> = ({
  children,
  onClick: f,
  selected,
}) => {
  return (
    <button
      className="w-full rounded-full py-2 text-white"
      onClick={() => f()}
      type="button"
      style={{
        background: selected ? "#304859" : "#BCCED9",
      }}
    >
      {children}
    </button>
  );
};

const AppTittle: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <h2 className="text-[#7191A5]">{children}</h2>;
};

const AppContainer: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

const Home: FunctionComponent = () => {
  const [playerCount, setPlayerCount] = useState<playerCountI>(1);
  const [theme, setTheme] = useState<themeI>("numbers");
  const [gridSize, setGridSize] = useState<gridSizeI>(8);

  const { startGame } = useGame();

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();
    startGame({
      gridSize,
      theme,
      playerCount,
    });
  };

  return (
    <div className="flex flex-col gap-20 items-center justify-center min-h-screen bg-[#152938] font-bold">
      <h1 className="text-white text-3xl">memory</h1>
      <form
        className="bg-white rounded-xl max-w-[500px] w-full p-10 flex flex-col gap-6"
        onSubmit={(e) => handleFormSubmission(e)}
      >
        <AppContainer>
          <AppTittle>Select Theme</AppTittle>
          <div className="flex justify-between items-center gap-4">
            <AppButton
              onClick={() => setTheme("numbers")}
              selected={theme === "numbers"}
            >
              Numbers
            </AppButton>
            <AppButton
              onClick={() => setTheme("icons")}
              selected={theme === "icons"}
            >
              Icons
            </AppButton>
          </div>
        </AppContainer>
        <AppContainer>
          <AppTittle>Numbers of players</AppTittle>
          <div className="flex justify-between items-center gap-4">
            <AppButton
              onClick={() => setPlayerCount(1)}
              selected={playerCount === 1}
            >
              1
            </AppButton>
            <AppButton
              onClick={() => setPlayerCount(2)}
              selected={playerCount === 2}
            >
              2
            </AppButton>
            <AppButton
              onClick={() => setPlayerCount(3)}
              selected={playerCount === 3}
            >
              3
            </AppButton>
            <AppButton
              onClick={() => setPlayerCount(4)}
              selected={playerCount === 4}
            >
              4
            </AppButton>
          </div>
        </AppContainer>
        <AppContainer>
          <AppTittle>Grid Size</AppTittle>
          <div className="flex justify-between items-center gap-4">
            <AppButton onClick={() => setGridSize(8)} selected={gridSize === 8}>
              4x4
            </AppButton>
            <AppButton
              onClick={() => setGridSize(18)}
              selected={gridSize === 18}
            >
              6x6
            </AppButton>
          </div>
        </AppContainer>
        <button
          type="submit"
          className="bg-[#FDA214] text-[#FCFCFC] text-2xl rounded-full py-4"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Home;
