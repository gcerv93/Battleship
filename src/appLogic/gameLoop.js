import computerFactory from "./computerFactory";
import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";
import { addEventListeners, displayLeftDiv, displayRightDiv } from "./DOMstuff";
import { placementDisplay, playerPlaceShips } from "./placementDisplay";

const gameLoop = () => {
  const humanPlayer = playerFactory("human");
  const compPlayer = computerFactory();

  const humanGameBoard = gameBoardFactory();
  const compGameBoard = gameBoardFactory();

  const gameOverCheck = () => {
    if (humanGameBoard.allSunk()) {
      return true;
    }
    if (compGameBoard.allSunk()) {
      return true;
    }

    return false;
  };

  const gameOver = () => {};

  const gameTurn = () => {
    addEventListeners(compGameBoard).then(() => {
      compPlayer.compTurn(humanGameBoard);
      displayLeftDiv(humanGameBoard);
      gameTurn();
    });

    gameOverCheck();
  };

  gameTurn();

  placementDisplay(humanGameBoard);
  playerPlaceShips.placePicker(humanGameBoard, humanGameBoard.getShips());

  displayLeftDiv(humanGameBoard);
  displayRightDiv(compGameBoard);

  // add in computer ship placement

  // playerShipPlacement(humanGameBoard);
  // // FOR TESTING!!!
  // const smallShip = humanGameBoard.getShips()[4];
  // playerPlaceShips.placePicker(humanGameBoard, firstShip);

  // humanGameBoard.placeShip([3, 3], "horizontal", firstShip);
  // humanGameBoard.receiveAttack([3, 3]);
  // humanGameBoard.receiveAttack([3, 2]);
  // humanGameBoard.receiveAttack([2, 2]);
  // humanGameBoard.receiveAttack([1, 2]);
  // humanGameBoard.receiveAttack([3, 4]);

  // const compShip = compGameBoard.getShips()[0];
  // compGameBoard.placeShip([3, 3], "horizontal", compShip);
  // compGameBoard.receiveAttack([3, 3]);
  // compGameBoard.receiveAttack([3, 2]);
  // // FOR TESTING!!!
};

export default gameLoop;
