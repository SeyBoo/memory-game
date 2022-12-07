import { FunctionComponent } from "react";

interface GameIconProps {
  flipImage: () => void;
  isFound: boolean;
  isOpen: boolean;
  value: number;
  image?: string;
}

const GameIcon: FunctionComponent<GameIconProps> = ({
  value,
  flipImage,
  isFound,
  isOpen,
  image,
}) => {
  const handleClick = () => {
    if (!isFound) {
      flipImage();
    }
  };

  return (
    <button
      className="flex justify-center items-center bg-[#304859] h-24 w-24 rounded-full text-white font-bold text-5xl"
      style={{
        background: isOpen ? "#FDA214" : isFound ? "#BCCED9" : "",
      }}
      onClick={() => handleClick()}
    >
      {isOpen || isFound ? (
        image ? (
          <img src={image} alt="game-icon" />
        ) : (
          value
        )
      ) : null}
    </button>
  );
};

export default GameIcon;
