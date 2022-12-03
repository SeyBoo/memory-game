import { FunctionComponent } from "react";

interface NavProps {
  restartGame: () => void;
  setupNewGame: () => void;
}

const Nav: FunctionComponent<NavProps> = ({ restartGame, setupNewGame }) => {
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
          onClick={() => setupNewGame()}
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default Nav;
