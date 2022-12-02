import {
  useContext,
  useState,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useEffect,
} from "react";
import GenerateShuffledNumbers from "../utils/generateShuffledNumbers";
import GenerateShuffledImages from "../utils/generateShuffledImages";

export type gridSizeI = 8 | 18;

export type themeI = "icons" | "numbers";

export type playerCountI = 1 | 2 | 3 | 4;

export interface GameArrayItem {
  index: number;
  image?: string;
}

interface Game {
  gridValue: GameArrayItem[];
  theme: themeI;
  playerCount: playerCountI;
  moveCounter: number;
  gridSize: gridSizeI;
  won: boolean;
}

interface StartGameProps {
  gridSize: gridSizeI;
  theme: themeI;
  playerCount: playerCountI;
}

interface GameActions {
  gameData: Game;
  startGame: ({ gridSize, theme, playerCount }: StartGameProps) => void;
  isCardsFound: (index: number) => boolean;
  isCardChosen: (value: number) => boolean;
  flipImage: (value: number, index: number) => void;
  restartGame: () => void;
  startNewGame: () => void;
}

const IsInGameContext = createContext({} as GameActions);
const IsInGameProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [game, setGame] = useState<Game>({
    gridValue: [],
    playerCount: 1,
    theme: "numbers",
    moveCounter: 0,
    gridSize: 8,
    won: false,
  });

  const [cardsChosen, setCardsChosen] = useState<number[]>([]);
  const [cardsChosenIds, setCardsChosenIds] = useState<number[]>([]);

  const [openCards, setOpenCards] = useState<number[]>([]);

  const GenerateShuffledGridValue = (theme: themeI, gridSize: gridSizeI) => {
    if (theme === "icons") {
      return GenerateShuffledImages(gridSize);
    } else {
      return GenerateShuffledNumbers(gridSize);
    }
  };

  const startGame = ({ gridSize, theme, playerCount }: StartGameProps) => {
    setGame({
      gridValue: GenerateShuffledGridValue(theme, gridSize),
      playerCount,
      theme,
      gridSize,
      moveCounter: 0,
      won: false,
    });
  };

  const restartGame = () => {
    setGame({
      ...game,
      moveCounter: 0,
      gridValue: GenerateShuffledGridValue(game.theme, game.gridSize),
      won: false,
    });
  };

  const startNewGame = () => {
    setGame({
      ...game,
      gridValue: [],
    });
  };

  const incrementMoveCounter = () => {
    setGame({
      ...game,
      moveCounter: game.moveCounter + 1,
    });
  };

  const flipImage = (value: number, index: number) => {
    if (cardsChosenIds?.length === 1 && cardsChosenIds[0] === index) {
      return;
    }

    // Check if
    if (cardsChosen?.length < 2) {
      setCardsChosen((cardsChosen) => cardsChosen?.concat(value));
      setCardsChosenIds((cardsChosenIds) => cardsChosenIds?.concat(index));

      if (cardsChosen?.length === 1) {
        incrementMoveCounter();
        // Check if images are the same
        if (cardsChosen[0] === value) {
          setOpenCards((openCards) =>
            openCards?.concat([cardsChosen[0], value])
          );
        }
        setTimeout(() => {
          setCardsChosenIds([]);
          setCardsChosen([]);
        }, 700);
      }
    }
  };

  const isCardChosen = (index: number) => {
    return Boolean(cardsChosenIds?.includes(index));
  };

  const isCardsFound = (value: number) => {
    return Boolean(openCards?.includes(value));
  };

  return (
    <IsInGameContext.Provider
      value={{
        gameData: game,
        startGame,
        isCardsFound,
        isCardChosen,
        flipImage,
        restartGame,
        startNewGame,
      }}
    >
      {children}
    </IsInGameContext.Provider>
  );
};

const useGame = () => {
  const context = useContext(IsInGameContext);
  if (!context) {
    throw new Error("useGame must be placed within a IsInGameProvider");
  }

  return context;
};

export default IsInGameProvider;
export { useGame };
