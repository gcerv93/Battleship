import computerFactory from "./computerFactory";
import playerFactory from "./playerFactory";
import gameBoardFactory from "./gameBoardFactory";
import { displayLeftDiv, displayRightDiv } from "./DOMstuff";

const gameLoop = () => {
  const humanPlayer = playerFactory("human");
  const compPlayer = computerFactory();

  const humanGameBoard = gameBoardFactory();
  const compGameBoard = gameBoardFactory();

  const gameOverCheck = () => {};

  // FOR TESTING!!!
  const firstShip = humanGameBoard.getShips()[0];
  humanGameBoard.placeShip([3, 3], "horizontal", firstShip);
  const compShip = compGameBoard.getShips()[0];
  compGameBoard.placeShip([3, 3], "horizontal", compShip);
  compGameBoard.receiveAttack([3, 3]);
  compGameBoard.receiveAttack([3, 2]);
  // FOR TESTING!!!

  displayLeftDiv(humanGameBoard);
  displayRightDiv(compGameBoard);
  // addEventListeners(computerGameBoard);
};

export default gameLoop;
