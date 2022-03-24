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
    // console.log(humanGameBoard.allSunk());
    // console.log(compGameBoard.allSunk());
    // console.log(compGameBoard.getShips());

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

    if (gameOverCheck()) {
      console.log("game over");
    }
  };

  placementDisplay(humanGameBoard);
  playerPlaceShips.placePicker(humanGameBoard, humanGameBoard.getShips());

  compGameBoard.getShips().forEach((ship) => {
    let result = compPlayer.generatePlacement();

    while (!compGameBoard.validatePlacement(result[0], result[1], ship)) {
      result = compPlayer.generatePlacement();
    }

    compGameBoard.placeShip(result[0], result[1], ship);
  });

  displayLeftDiv(humanGameBoard);
  displayRightDiv(compGameBoard);

  gameTurn();
};

export default gameLoop;
