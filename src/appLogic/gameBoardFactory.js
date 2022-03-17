import shipFactory from "./shipFactory";

const gameBoardFactory = () => {
  const board = [
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
  ];

  const missed = [];

  function createShips() {
    const carrier = shipFactory("carrier", 5);
    const battleship = shipFactory("battleship", 4);
    const destroyer = shipFactory("destroyer", 3);
    const submarine = shipFactory("submarine", 3);
    const patrolBoat = shipFactory("patrol boat", 2);

    return [carrier, battleship, destroyer, submarine, patrolBoat];
  }

  const ships = createShips();

  function getShips() {
    return ships;
  }

  function getBoard() {
    return board;
  }

  function allSunk(gameShips = ships) {
    if (gameShips.length > 0) {
      return false;
    }

    return true;
  }

  function sinkShip(sunkShip) {
    const index = ships.findIndex((ship) => sunkShip.name === ship.name);

    ships.splice(index, 1);
  }

  function placeVertically(coords, ship) {
    for (let i = 0; i < ship.length; i += 1) {
      board[coords[0] + i][coords[1]] = {
        ship,
        name: ship.name,
        length: ship.length,
        index: i,
        hit: false,
      };
    }
  }

  function placeHorizontally(coords, ship) {
    for (let i = 0; i < ship.length; i += 1) {
      board[coords[0]][coords[1] + i] = {
        ship,
        name: ship.name,
        length: ship.length,
        index: i,
        hit: false,
      };
    }
  }

  function placeShip(coords, orientation, ship) {
    if (orientation === "vertical") {
      placeVertically(coords, ship);
    } else {
      placeHorizontally(coords, ship);
    }
  }

  function receiveAttack(coords) {
    if (board[coords[0]][coords[1]] === false) {
      missed.push(coords);
    } else {
      const obj = board[coords[0]][coords[1]];
      obj.hit = true;
      obj.ship.hit(obj.index);

      if (obj.ship.isSunk()) {
        sinkShip(obj.ship);
      }
    }
  }

  return {
    getBoard,
    getShips,
    allSunk,
    placeShip,
    missed,
    receiveAttack,
  };
};

export default gameBoardFactory;
