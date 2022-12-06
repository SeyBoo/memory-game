import {
  FligImageReponse,
  FlipImageProps,
  Game,
  GameArrayItem,
  GameCardsI,
  gridSizeI,
  StartGameProps,
  themeI,
} from "../../../../common/types/game.inteface";
import { GameBackend } from "../";
import GenerateShuffledImages from "../../../../common/utils/generateShuffledImages";
import GenerateShuffledNumbers from "../../../../common/utils/generateShuffledNumbers";

export default class SoloGame implements GameBackend {
  private _cards: GameCardsI = {
    cardsChosenIds: [],
    cardsChosen: [],
    openCards: [],
  };
  public get getCards(): GameCardsI {
    return this._cards;
  }
  public set setCards(value: GameCardsI) {
    this._cards = value;
  }
  private _game: Game = {
    gridValue: [],
    theme: "icons",
    playerCount: 1,
    moveCounter: 0,
    gridSize: 8,
    won: false,
  };
  public get getGame(): Game {
    return this._game;
  }
  public set setGame(value: Game) {
    this._game = value;
  }
  private _gameTimer: number = 1;
  public get getGameTimer(): number {
    return this._gameTimer;
  }
  public set setGameTimer(value: number) {
    this._gameTimer = value;
  }

  generateShuffledGridValue(
    theme: themeI,
    gridSize: gridSizeI
  ): GameArrayItem[] {
    if (theme === "icons") {
      return GenerateShuffledImages(gridSize);
    } else {
      return GenerateShuffledNumbers(gridSize);
    }
  }

  startGame({ gridSize, playerCount, theme }: StartGameProps): Game {
    this.setGame = {
      gridValue: this.generateShuffledGridValue(theme, gridSize),
      playerCount,
      theme,
      gridSize,
      moveCounter: 0,
      won: false,
    };
    return this.getGame;
  }

  incrementMoveCounter() {
    this.setGame = {
      ...this.getGame,
      moveCounter: this.getGame.moveCounter + 1,
    };
  }

  getTimer() {
    this.setGameTimer = this.getGameTimer + 1;
    return this.getGameTimer;
  }

  checkIfWon() {
    if (this.getGame.gridValue.length === this.getCards.openCards.length) {
      this.setGame = {
        ...this.getGame,
        won: true,
      };
    }
  }

  flipImage({ value, index }: FlipImageProps): FligImageReponse | void {
    if (
      this.getCards.cardsChosenIds?.length === 1 &&
      this.getCards.cardsChosenIds[0] === index
    ) {
      return;
    }

    // Check if
    if (this.getCards.cardsChosen?.length < 2) {
      let clean = false;
      if (this.getCards.cardsChosen?.length === 1) {
        this.incrementMoveCounter();
        // Check if images are the same
        if (this.getCards.cardsChosen[0] === value) {
          this.setCards = {
            ...this.getCards,
            openCards: this.getCards.openCards?.concat([
              this.getCards.cardsChosen[0],
              value,
            ]),
          };
          this.checkIfWon();
          clean = true;
        }
      }
      this.setCards = {
        ...this.getCards,
        cardsChosen: this.getCards.cardsChosen?.concat(value),
        cardsChosenIds: this.getCards.cardsChosenIds?.concat(index),
      };

      if (this.getCards.cardsChosen.length === 2) {
        clean = true;
        setTimeout(() => {
          this.setCards = {
            ...this.getCards,
            cardsChosen: [],
            cardsChosenIds: [],
          };
        }, 700);
      }

      return {
        game: this.getGame,
        cards: this.getCards,
        clean,
      };
    }
  }
}
