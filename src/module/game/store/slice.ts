import { Game, GameCardsI } from "../../../common/types/game.inteface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./state";

interface setGamePayload {
  game: Game;
}

interface setCardsPayload {
  cards: GameCardsI;
}

interface setGameTimerPayload {
  timer: number;
}

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame: (state, action: PayloadAction<setGamePayload>) => {
      state.gameData = action.payload.game;
    },
    resetGame: (state) => {
      state.gameData = null;
    },
    setCards: (state, action: PayloadAction<setCardsPayload>) => {
      state.gameCards = action.payload.cards;
    },
    setGameTimer: (state, action: PayloadAction<setGameTimerPayload>) => {
      state.gameTimer = action.payload.timer;
    },
  },
});

export const { setGame, setCards, resetGame, setGameTimer } = gameSlice.actions;

export default gameSlice;
