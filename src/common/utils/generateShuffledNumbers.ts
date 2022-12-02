import { GameArrayItem } from "../hooks/useIsInGame";
import Shuffle from "./shuffle";

const GenerateShuffledNumbers = (grid: 8 | 18) => {
  const arr: GameArrayItem[] = [];

  for (let i = 1; i < grid + 1; i++) {
    arr.push({index: i});
    arr.push({index: i});
  }

  return Shuffle(arr);
};

export default GenerateShuffledNumbers;
