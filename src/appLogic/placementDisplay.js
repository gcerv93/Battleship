const playerShipPlacement = (board) => {
  const container = document.querySelector(".placer");
  board.getBoard().forEach((row, i) => {
    const rowCell = document.createElement("div");
    rowCell.dataset.index = i;
    rowCell.classList.add("row");
    row.forEach((_cell, idx) => {
      const boardCell = document.createElement("div");
      boardCell.dataset.index = idx;
      boardCell.classList.add("cell");
      rowCell.appendChild(boardCell);
    });
    container.appendChild(rowCell);
  });
};

export default playerShipPlacement;
