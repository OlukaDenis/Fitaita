const GameStorage = (() => {
  const currentPlayer = (names) => {
    const player = JSON.stringify(names);
    window.localStorage.setItem('currentplayer', player);
    return (player);
  };

  const getCurrentPlayer = () => JSON.parse(localStorage.getItem('currentplayer'));

  const currentScore = (params = 0) => {
    const score = JSON.stringify(params);
    window.localStorage.setItem('currentscore', score);
    return (score);
  };

  const getCurrentScore = () => JSON.parse(localStorage.getItem('currentscore'));

  return {
    currentPlayer,
    getCurrentPlayer,
    currentScore,
    getCurrentScore,
  };
})();

export default GameStorage;