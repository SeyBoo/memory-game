import {
  FormEvent,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";
import Modal from "../common/components/modal";
import { useAppDispatch } from "../common/hooks/useStore";
import { startGame } from "../module/game/store/thunk";
import {
  gridSizeI,
  playerCountI,
  StartGameProps,
  themeI,
} from "../common/types/game.inteface";

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
  const [showJoinGameModal, setShowJoinGameModal] = useState<boolean>(false);
  const [gameCode, setGameCode] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleStartGame = async ({
    gridSize,
    playerCount,
    theme,
  }: StartGameProps) => {
    try {
      await dispatch(startGame({ gridSize, playerCount, theme }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();
    handleStartGame({
      gridSize,
      theme,
      playerCount,
    });
  };

  const handleJoinGame = () => {
    if (gameCode === "") return;
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
      <div
        className="self-end mr-20"
        onClick={() => setShowJoinGameModal(!showJoinGameModal)}
      >
        <button className="text-white border px-6 py-2 rounded-full">
          Join game
        </button>
      </div>
      {showJoinGameModal && (
        <Modal displayModal={showJoinGameModal}>
          <div className="flex flex-col gap-10">
            <h5 className="text-3xl font-semibold">Join a game</h5>
            <input
              type="text"
              placeholder="4a40"
              className="text-center"
              onChange={(e) => console.log(e)}
            />
            <button
              type="button"
              className="font-semibold border w-fit m-auto p-2 px-6 uppercase"
              onClick={() => handleJoinGame()}
            >
              Join
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Home;
