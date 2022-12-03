import Modal from "../../common/components/modal";
import { FunctionComponent } from "react";

interface FooterProps {
  restartGame: () => void;
  setupNewGame: () => void;
}

const Footer: FunctionComponent<FooterProps> = ({
  restartGame,
  setupNewGame,
}) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <button
        onClick={() => restartGame()}
        className="bg-[#FDA214] w-full text-white rounded-full text-lg py-2 font-semibold"
      >
        Restart
      </button>
      <button
        onClick={() => setupNewGame()}
        className="bg-[#DFE7EC] text-[#304859] w-full text-lg font-semibold rounded-full py-2"
      >
        Setup New Game
      </button>
    </div>
  );
};

interface StatCardProps {
  name: string;
  value: string;
}

const StatCard: FunctionComponent<StatCardProps> = ({ name, value }) => {
  return (
    <div className="bg-[#DFE7EC] flex justify-between items-center py-4 px-6 rounded-lg">
      <h3 className="text-[#7191A5] font-semibold">{name}</h3>
      <p className="text-[#304859] font-bold text-3xl">{value}</p>
    </div>
  );
};

interface SoloWinModalProps {
  restartGame: () => void;
  setupNewGame: () => void;
  moves: number;
  gameTime: string;
  showModal: boolean;
}

const SoloWinModal: FunctionComponent<SoloWinModalProps> = ({
  setupNewGame,
  restartGame,
  moves,
  gameTime,
  showModal,
}) => {
  
  return (
    <Modal displayModal={showModal}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 font-medium">
          <h2 className="text-[#152938] font-semibold text-5xl">You did it!</h2>
          <p className="text-[#7191A5]">Game over! Here's how you got on…</p>
        </div>
        <div className="flex flex-col gap-4">
          <StatCard name="Time Elapsed" value={gameTime} />
          <StatCard name="Moves Taken" value={`${moves} Moves`} />
        </div>
        <Footer restartGame={restartGame} setupNewGame={setupNewGame} />
      </div>
    </Modal>
  );
};

export default SoloWinModal;
