import { Game, GameCardsI } from "@/common/types/game.inteface";

interface GameState {
  gameData: Game | null;
  gameCards: GameCardsI;
  gameTimer: number;
}

const initialState: GameState = {
  gameData: null,
  gameTimer: 0,
  gameCards: {
    cardsChosen: [],
    cardsChosenIds: [],
    openCards: [],
  },
};

export default initialState;
