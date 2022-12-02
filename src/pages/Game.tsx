import { FunctionComponent, useEffect, useState } from "react";
import { useGame } from "../common/hooks/useIsInGame";

interface GameNavProps {
  restartGame: () => void;
  startNewGame: () => void;
}

const GameNav: FunctionComponent<GameNavProps> = ({
  restartGame,
  startNewGame,
}) => {
  return (
    <div className="flex justify-between font-bold">
      <h1 className="text-[#152938] text-3xl">memory</h1>
      <div className="flex gap-4 items-center">
        <button
          className="bg-[#FDA214] text-[#FCFCFC] rounded-full py-2 px-6"
          onClick={() => restartGame()}
        >
          Restart
        </button>
        <button
          className="text-[#304859] bg-[#DFE7EC] rounded-full py-2 px-6"
          onClick={() => startNewGame()}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

const RenderTimer: FunctionComponent = () => {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setSecondsElapsed(() => {
        return secondsElapsed + 1;
      });
    }, 1000);
  }, [secondsElapsed]);

  let seconds = secondsElapsed;
  let days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return (
    <div className="flex text-[#304859] font-bold text-3xl">
      {days > 0 && <p>{days}:</p>}
      {hours > 0 && <p>{hours}:</p>}
      {minutes > 0 && <p>{minutes}:</p>}
      {seconds && <p>{seconds}</p>}
    </div>
  );
};

interface GameButtonProps {
  flipImage: () => void;
  isFound: boolean;
  isOpen: boolean;
  value: number;
  image?: string;
}

const GameButton: FunctionComponent<GameButtonProps> = ({
  value,
  flipImage,
  isFound,
  isOpen,
  image,
}) => {
  const handleClick = () => {
    if (!isFound) {
      flipImage();
    }
  };

  return (
    <button
      className="flex justify-center items-center bg-[#304859] h-24 w-24 rounded-full text-white font-bold text-5xl"
      style={{
        background: isOpen ? "#FDA214" : isFound ? "#BCCED9" : "",
      }}
      onClick={() => handleClick()}
    >
      {isOpen || isFound ? image ? <img src={image} alt="" /> : value : ""}
    </button>
  );
};

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
      <GameNav restartGame={restartGame} startNewGame={startNewGame} />
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
            <RenderTimer />
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
