import Timer from "../common/components/timer";
import { FunctionComponent, useEffect } from "react";
import Nav from "../common/components/nav";
import GameIcon from "../module/game/components/gameIcon";
import WinModal from "../module/game/components/winModal";
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

  const game = useAppSelector((state) => state.game);

  const handleRestartGame = async () => {
    try {
      await dispatch(restartGame());
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheckIsCardChosen = (index: number): boolean => {
    return Boolean(game.gameCards.cardsChosenIds?.includes(index));
  };

  const handleCheckIsCardFound = (value: number): boolean => {
    return Boolean(game.gameCards.openCards?.includes(value));
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
    if (game.gameData && !game.gameData.won) {
      setInterval(async () => {
        await dispatch(getGameTimer());
      }, 1000);
    }
  }, [game.gameData, dispatch]);

  if (!game.gameData) return null;

  return (
    <div className="w-[80%] m-auto py-10">
      <Nav restartGame={handleRestartGame} setupNewGame={handleSetupNewGame} />
      <WinModal
        gameTime={formatTimer(game.gameTimer)}
        moves={game.gameData.moveCounter}
        restartGame={handleRestartGame}
        setupNewGame={handleSetupNewGame}
        showModal={game.gameData.won}
      />
      <main className="flex flex-col items-center mt-20">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${
              game.gameData.gridSize === 8 ? "4" : "6"
            }, minmax(0, 1fr))`,
          }}
        >
          {game.gameData.gridValue.map((value, index) => (
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
            <Timer time={game.gameTimer} />
          </div>
          <div className="bg-[#DFE7EC] flex justify-between items-center rounded-lg p-5 w-full">
            <h5 className="text-[#7191A5] font-bold">Moves</h5>
            <h6 className="text-[#304859] font-bold text-3xl">
              {game.gameData.moveCounter}
            </h6>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
