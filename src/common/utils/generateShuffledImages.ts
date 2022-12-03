import Shuffle from "./shuffle";
import Anchor from '../assets/icon/anchor.png'
import Bug from '../assets/icon/bug.png'
import Car from '../assets/icon/car.png'
import Flask from '../assets/icon/flask.png'
import Futbol from '../assets/icon/futbol.png'
import Moon from '../assets/icon/moon.png'
import Snowflake from '../assets/icon/snowflake.png'
import Sun from '../assets/icon/sun.png'
import HandSpock from '../assets/icon/hand-spock.png'
import LiraSign from '../assets/icon/lira-sign.png'
import Building from '../assets/icon/building.png'
import Cloud from '../assets/icon/cloud.png'
import Feather from '../assets/icon/feather.png'
import Fish from '../assets/icon/fish.png'
import Mountain from '../assets/icon/mountain.png'
import Ticket from '../assets/icon/ticket.png'
import Mouskito from '../assets/icon/mouskito.png'
import { GameArrayItem } from "../hooks/useIsInGame";

const iconList = [
  Anchor,
  Bug,
  Car,
  Flask,
  Futbol,
  Moon,
  Snowflake,
  Sun,
  HandSpock,
  Sun,
  LiraSign,
  Building,
  Cloud,
  Feather,
  Fish,
  Mountain,
  Ticket,
  Mouskito
]

const GenerateShuffledImages = (grid: 8 | 18) => {
  const arr: GameArrayItem[] = [];

  for (let i = 1; i < grid + 1; i++) {
    arr.push({
      image: iconList[i],
      index: i,
    });
    arr.push({
      image: iconList[i],
      index: i,
    });
  }

  return Shuffle(arr);
};

export default GenerateShuffledImages;
