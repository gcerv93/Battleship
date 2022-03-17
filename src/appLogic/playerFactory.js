const playerFactory = (name) => {
  function playerTurn(coords, enemyBoard) {
    enemyBoard.receiveAttack(coords);
  }

  return { name, playerTurn };
};

export default playerFactory;
