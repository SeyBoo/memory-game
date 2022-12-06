import Timer from "../common/components/timer";
import { FunctionComponent, useCallback, useEffect } from "react";
import Nav from "../common/components/nav";
import GameIcon from "../module/soloGame/components/gameIcon";
import SoloWinModal from "../module/soloGame/soloWinModal";
import formatTimer from "../common/utils/formatTimer";
import { useAppDispatch, useAppSelector } from "../common/hooks/useStore";
import {
  flipImage,
  getGameTimer,
  restartGame,
  setupNewGame,
} from "../module/game/store/thunk";
import { FlipImageProps } from "@/common/types/game.inteface";

const Game: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  const gameData = useAppSelector((state) => state.game.gameData);
  const cardsChosenIds = useAppSelector(
    (state) => state.game.gameCards.cardsChosenIds
  );
  const openCards = useAppSelector((state) => state.game.gameCards.openCards);
  const gameTimer = useAppSelector((state) => state.game.gameTimer);
  console.log(gameTimer);

  const handleRestartGame = async () => {
    try {
      await dispatch(restartGame());
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckIsCardChosen = (index: number): boolean => {
    return Boolean(cardsChosenIds?.includes(index));
  };

  const handleCheckIsCardFound = (value: number): boolean => {
    return Boolean(openCards?.includes(value));
  };

  const handleFlipImage = async ({ value, index }: FlipImageProps) => {
    try {
      await dispatch(flipImage({ value, index }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetupNewGame = async () => {
    try {
      await dispatch(setupNewGame());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (gameData && !gameData.won) {
      setInterval(async () => {
        await dispatch(getGameTimer());
      }, 1000);
    }
  }, [gameData, dispatch]);

  if (!gameData) return null;

  return (
    <div className="w-[80%] m-auto py-10">
      <Nav restartGame={handleRestartGame} setupNewGame={handleSetupNewGame} />
      <SoloWinModal
        gameTime={formatTimer(gameTimer)}
        moves={gameData.moveCounter}
        restartGame={handleRestartGame}
        setupNewGame={handleSetupNewGame}
        showModal={gameData.won}
      />
      <main className="flex flex-col items-center mt-20">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${
              gameData.gridSize === 8 ? "4" : "6"
            }, minmax(0, 1fr))`,
          }}
        >
          {gameData.gridValue.map((value, index) => (
            <GameIcon
              key={index}
              flipImage={() =>
                handleFlipImage({
                  index: index,
                  value: value.index,
                })
              }
              isOpen={handleCheckIsCardChosen(index)}
              isFound={handleCheckIsCardFound(value.index)}
              value={value.index}
              image={value.image}
            />
          ))}
        </div>
        <div className="flex gap-6 max-w-[500px] w-full mt-20">
          <div className="bg-[rgb(223,231,236)] flex justify-between items-center rounded-lg p-5 w-full">
            <h5 className="text-[#7191A5] font-bold">Time</h5>
            <Timer time={gameTimer} />
          </div>
          <div className="bg-[#DFE7EC] flex justify-between items-center rounded-lg p-5 w-full">
            <h5 className="text-[#7191A5] font-bold">Moves</h5>
            <h6 className="text-[#304859] font-bold text-3xl">
              {gameData.moveCounter}
            </h6>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
