const isArrayInArray = (arr, item) => {
  const itemAsString = JSON.stringify(item);

  const contains = arr.some((ele) => JSON.stringify(ele) === itemAsString);
  return contains;
};

const clearDisplay = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const displayLeftDiv = (board) => {
  const leftDiv = document.querySelector(".left");
  clearDisplay(leftDiv);

  // TODO: add support for when a shot is a hit or a miss
  board.getBoard().forEach((row, i) => {
    const rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach((cell, idx) => {
      const boardCell = document.createElement("div");
      boardCell.dataset.index = idx;

      if (cell === false) {
        boardCell.classList.add("cell");
      } else {
        boardCell.classList.add("occupied");
      }

      if (cell.hit === true) {
        boardCell.classList.add("hit");
      } else if (isArrayInArray(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    leftDiv.appendChild(rowCell);
  });
};

const displayRightDiv = (board) => {
  const rightDiv = document.querySelector(".right");

  board.getBoard().forEach((row, i) => {
    const rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach((cell, idx) => {
      const boardCell = document.createElement("div");
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");

      if (cell.hit) {
        boardCell.classList.add("hit");
      } else if (isArrayInArray(board.missed, [i, idx])) {
        boardCell.classList.add("miss");
      }

      rowCell.appendChild(boardCell);
    });
    rightDiv.appendChild(rowCell);
  });
};

const addEventListeners = (board) => {
  const compBoard = document.querySelector(".right");
  const promise = new Promise((resolve) => {
    compBoard.addEventListener("click", (e) => {
      if (e.target.parentElement !== compBoard) {
        const rowIndex = parseInt(e.target.parentElement.dataset.index, 10);
        const cellIndex = parseInt(e.target.dataset.index, 10);
        board.receiveAttack([rowIndex, cellIndex]);
        clearDisplay(compBoard);
        displayRightDiv(board);
        resolve();
      }
    });
  });

  return promise;
};

export { displayLeftDiv, displayRightDiv, addEventListeners };
