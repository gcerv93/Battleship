import { displayLeftDiv } from "./DOMstuff";

const placementDisplay = (board) => {
  const container = document.querySelector(".placer");
  board.getBoard().forEach((row, i) => {
    const rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach((cell, idx) => {
      const boardCell = document.createElement("div");
      boardCell.dataset.row = i;
      boardCell.dataset.index = idx;
      if (cell === false) {
        boardCell.classList.add("cell");
      } else {
        boardCell.classList.add("occupied");
      }
      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

const clearDisplay = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const playerPlaceShips = (() => {
  let rotator = 1;
  let idx = 0;

  const horizontalElement = (rowIndex, cellIndex, i) => {
    const rowNum = parseInt(rowIndex, 10);
    const num = parseInt(cellIndex, 10) + i;

    const selector = `.cell[data-row="${rowNum}"][data-index="${num}"]`;
    const hoverCell = document.querySelector(selector);

    return hoverCell;
  };

  const verticalElement = (rowIndex, cellIndex, i) => {
    const rowNum = parseInt(rowIndex, 10) + i;
    const num = parseInt(cellIndex, 10);

    const selector = `.cell[data-row="${rowNum}"][data-index="${num}"]`;
    const hoverCell = document.querySelector(selector);

    return hoverCell;
  };

  const placePicker = (board, ships) => {
    let ship = ships[idx];

    const shipText = document.querySelector(".shipText");
    shipText.textContent = ship.name;

    const cells = document.querySelectorAll(".placer .cell");

    const hoverListener = (e) => {
      const rowIndex = e.target.parentElement.dataset.index;
      const cellIndex = e.target.dataset.index;
      if (rotator === 1) {
        for (let i = 0; i < ship.length; i += 1) {
          const hoverCell = horizontalElement(rowIndex, cellIndex, i);
          hoverCell.classList.add("placerCell");
        }
      } else if (rotator === 2) {
        for (let i = 0; i < ship.length; i += 1) {
          const hoverCell = verticalElement(rowIndex, cellIndex, i);
          hoverCell.classList.add("placerCell");
        }
      }
    };

    const hoverOutListener = (e) => {
      const rowIndex = e.target.parentElement.dataset.index;
      const cellIndex = e.target.dataset.index;
      if (rotator === 1) {
        for (let i = 0; i < ship.length; i += 1) {
          const hoverCell = horizontalElement(rowIndex, cellIndex, i);
          hoverCell.classList.remove("placerCell");
        }
      } else if (rotator === 2) {
        for (let i = 0; i < ship.length; i += 1) {
          const hoverCell = verticalElement(rowIndex, cellIndex, i);
          hoverCell.classList.remove("placerCell");
        }
      }
    };

    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", hoverListener);
      cell.addEventListener("mouseleave", hoverOutListener);
      const listener = (e) => {
        const x = parseInt(e.target.dataset.row, 10);
        const y = parseInt(e.target.dataset.index, 10);
        let orientation;
        if (rotator === 1) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }
        if (board.validatePlacement([x, y], orientation, ship) === true) {
          board.placeShip([x, y], orientation, ship);
          idx += 1;
          if (idx === ships.length) {
            const overlay = document.querySelector("#overlay");
            overlay.classList.remove("overlay");
            const popup = document.querySelector(".placement");
            popup.style.display = "none";
            displayLeftDiv(board);
          }
          ship = ships[idx];
          clearDisplay(document.querySelector(".placer"));
          placementDisplay(board);
          placePicker(board, ships);
        }
        cell.removeEventListener("click", listener);
      };
      cell.addEventListener("click", listener);
    });
  };

  const changeRotator = () => {
    if (rotator === 1) {
      rotator = 2;
    } else {
      rotator = 1;
    }
  };

  const rotatorBtn = document.querySelector(".rotate");
  rotatorBtn.addEventListener("click", () => {
    changeRotator();
  });

  return { placePicker };
})();

export { placementDisplay, playerPlaceShips };
