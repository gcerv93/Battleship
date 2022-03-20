const playerShipPlacement = (board) => {
  const container = document.querySelector(".placer");
  board.getBoard().forEach((row, i) => {
    const rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach((_cell, idx) => {
      const boardCell = document.createElement("div");
      boardCell.dataset.row = i;
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");
      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

const playerPlaceShips = (() => {
  let rotator = 1;

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

  const placePicker = (board, ship) => {
    const shipText = document.querySelector(".shipText");
    shipText.textContent = ship.name;

    const cells = document.querySelectorAll(".placer .cell");

    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", (e) => {
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
      });

      cell.addEventListener("mouseleave", (e) => {
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
      });

      cell.addEventListener("click", (e) => {
        console.log(ship, board);
        console.log(board.getBoard());
        let orientation;
        if (rotator === 1) {
          orientation = "horizontal";
        } else {
          orientation = "vertical";
        }

        console.log(e.target.dataset.row, e.target.dataset.index);
        console.log(
          board.validatePlacement(
            [e.target.dataset.row, e.target.dataset.index],
            orientation,
            ship
          )
        );
      });
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

export { playerShipPlacement, playerPlaceShips };
