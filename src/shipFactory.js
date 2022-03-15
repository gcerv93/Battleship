const shipFactory = (length) => {
  const shipBlocks = new Array(length).fill(true);

  const getShipBlocks = () => shipBlocks;

  function hit(num) {
    shipBlocks[num] = null;
  }

  function isSunk() {
    const result = shipBlocks.every((block) => block === null);

    return result;
  }

  return { length, getShipBlocks, hit, isSunk };
};

export default shipFactory;
