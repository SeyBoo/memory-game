import {
  FlipImageProps,
  StartGameProps,
} from "../../../common/types/game.inteface";
import { AppThunk } from "../../../common/store";
import { getGameBackend } from "../api";
import { resetGame, setCards, setGame, setGameTimer } from "./slice";

export const startGame =
  ({ gridSize, playerCount, theme }: StartGameProps): AppThunk =>
  async (dispatch) => {
    const gameBackend = await getGameBackend("solo");
    const game = await gameBackend.startGame({
      gridSize,
      playerCount,
      theme,
    });
    await dispatch(setGame({ game }));
  };

export const getGameTimer = (): AppThunk => async (dispatch) => {
  const gameBackend = await getGameBackend("solo");
  const timer = await gameBackend.getTimer();
  await dispatch(setGameTimer({ timer }));
};

export const restartGame = (): AppThunk => async (dispatch, getState) => {
  const gameBackend = await getGameBackend("solo");
  const currentGame = await getState().game.gameData;
  if (!currentGame) return;

  const game = await gameBackend.startGame({
    gridSize: currentGame.gridSize,
    playerCount: currentGame.playerCount,
    theme: currentGame.theme,
  });

  await dispatch(setGame({ game }));
};

export const setupNewGame = (): AppThunk => async (dispatch) => {
  await dispatch(resetGame());
};

export const flipImage =
  ({ value, index }: FlipImageProps): AppThunk =>
  async (dispatch) => {
    const gameBackend = await getGameBackend("solo");

    const response = await gameBackend.flipImage({ value, index });

    if (!response) return;

    await dispatch(setCards({ cards: response.cards }));

    await dispatch(setGame({ game: response.game }));

    if (response.shouldCleanChosenCard) {
      setTimeout(async () => {
        const resetCards = {
          ...response.cards,
          cardsChosen: [],
          cardsChosenIds: [],
        };
        await dispatch(setCards({ cards: resetCards }));
      }, 700);
    }
  };
