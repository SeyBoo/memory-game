import {
  FlipImageProps,
  Game,
  FligImageReponse,
  StartGameProps,
} from "../../../common/types/game.inteface";

export interface GameBackend {
  flipImage: ({ value, index }: FlipImageProps) => FligImageReponse | void;

  startGame: ({ gridSize, theme, playerCount }: StartGameProps) => Game;
}

let gameBackend: undefined | GameBackend = undefined;

export type GameType = "solo" | "multiplayer";

export async function getGameBackend(gameType: GameType): Promise<GameBackend> {
  if (gameBackend === undefined) {
    const mod = await import("./backends/" + gameType);
    gameBackend = new mod.default() as GameBackend;
  }
  return gameBackend;
}
