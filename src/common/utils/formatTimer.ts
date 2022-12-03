const formatTimer = (gameTimer: number): string => {
  let seconds = gameTimer;
  let days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  let hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  const formatedAnswer = () => {
    var dDisplay = days > 0 ? days + ":" : "";
    var hDisplay = hours > 0 ? hours + ":" : "";
    var mDisplay = minutes > 0 ? minutes + ":" : "";
    var sDisplay = seconds > 0 ? seconds : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

  return formatedAnswer();
};

export default formatTimer;