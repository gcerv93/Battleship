const displayLeftDiv = (board) => {
  const leftDiv = document.querySelector(".left");

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

      rowCell.appendChild(boardCell);
    });
    leftDiv.appendChild(rowCell);
  });
};

const isArrayInArray = (arr, item) => {
  const itemAsString = JSON.stringify(item);

  const contains = arr.some((ele) => JSON.stringify(ele) === itemAsString);
  return contains;
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

export { displayLeftDiv, displayRightDiv };
