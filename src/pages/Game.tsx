import Timer from "../common/components/timer";
import { FunctionComponent } from "react";
import { useGame } from "../common/hooks/useIsInGame";
import Nav from "../common/components/nav";
import GameIcon from "../module/soloGame/components/gameIcon";
import SoloWinModal from "../module/soloGame/soloWinModal";
import formatTimer from "../common/utils/formatTimer";

const Game: FunctionComponent = () => {
  const {
    gameData,
    isCardChosen,
    isCardsFound,
    flipImage,
    restartGame,
    startNewGame,
  } = useGame();

  if (gameData.won) console.log('won');
  
  return (
    <div className="w-[80%] m-auto py-10">
      <Nav restartGame={restartGame} setupNewGame={setupNewGame} />
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
            <GameButton
              key={index}
              flipImage={() => flipImage(value.index, index)}
              isOpen={isCardChosen(index)}
              isFound={isCardsFound(value.index)}
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
