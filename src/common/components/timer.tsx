import { FunctionComponent } from "react";
import formatTimer from "../utils/formatTimer";

interface TimerProps {
  time: number;
}

const Timer: FunctionComponent<TimerProps> = ({ time }) => {
  return (
    <div className="flex text-[#304859] font-bold text-3xl">
      {formatTimer(time)}
    </div>
  );
};

export default Timer;
