import Computer from "./Factories/Computer";
import Gameboard from "./Factories/Gameboard";
import {
  listenForClick,
  displayPlayerDiv,
  displayCompDiv,
  gameOverDisplay,
} from "./DOMstuff";
import { placementDisplay, playerPlaceShips } from "./placementDisplay";

const gameLoop = () => {
  const compPlayer = Computer();

  const humanGameBoard = Gameboard();
  const compGameBoard = Gameboard();

  const gameOverCheck = () => {
    if (humanGameBoard.allSunk()) {
      return true;
    }
    if (compGameBoard.allSunk()) {
      return true;
    }

    return false;
  };

  // recursive function instead of a loop for the game, so that I can wait on the click promise from listenForClick
  const gameTurn = () => {
    if (gameOverCheck()) {
      playerPlaceShips.resetProperties();

      if (humanGameBoard.allSunk()) {
        gameOverDisplay("You Lost :(", gameLoop);
      } else {
        gameOverDisplay("You Win!", gameLoop);
      }
    } else {
      listenForClick(compGameBoard).then(() => {
        compPlayer.compTurn(humanGameBoard);
        displayPlayerDiv(humanGameBoard);
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

  displayPlayerDiv(humanGameBoard);
  displayCompDiv(compGameBoard);

  gameTurn();
};

export default gameLoop;
