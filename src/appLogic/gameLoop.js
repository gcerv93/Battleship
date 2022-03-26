import computerFactory from "./computerFactory";
import gameBoardFactory from "./gameBoardFactory";
import {
  addEventListeners,
  displayLeftDiv,
  displayRightDiv,
  gameOverDisplay,
} from "./DOMstuff";
import { placementDisplay, playerPlaceShips } from "./placementDisplay";

const gameLoop = () => {
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

  const gameTurn = () => {
    if (gameOverCheck()) {
      playerPlaceShips.resetProperties();
      if (humanGameBoard.allSunk()) {
        gameOverDisplay("You Lost :(", gameLoop);
      } else {
        gameOverDisplay("You Win!", gameLoop);
      }
    } else {
      addEventListeners(compGameBoard).then(() => {
        compPlayer.compTurn(humanGameBoard);
        displayLeftDiv(humanGameBoard);
        gameTurn();
      });
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
