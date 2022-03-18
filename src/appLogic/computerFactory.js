const computerFactory = () => {
  const previousMoves = [];

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateMove() {
    const result = [];

    const x = randomInteger(0, 9);
    const y = randomInteger(0, 9);

    result.push(x);
    result.push(y);

    return result;
  }

  function generatePlacement() {
    const result = [];

    const x = randomInteger(0, 9);
    const y = randomInteger(0, 9);
    const z = randomInteger(1, 2);

    result.push([x, y]);
    result.push(z);

    return result;
  }

  function compTurn(enemyBoard) {
    let coords = generateMove();

    while (previousMoves.includes(coords)) {
      coords = generateMove();
    }

    enemyBoard.receiveAttack(coords);
    previousMoves.push(coords);
  }

  return { previousMoves, generateMove, generatePlacement, compTurn };
};

export default computerFactory;
