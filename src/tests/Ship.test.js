import Ship from "../appLogic/Factories/Ship";

test("returns an object with the correct name property", () => {
  const ship = Ship("carrier", 5);
  expect(ship).toHaveProperty("name");
  expect(ship.name).toBe("carrier");
});

test("returns an object with the correct length property", () => {
  const ship = Ship("battleship", 4);
  expect(ship.length).toBe(4);
});

test("returns an object with a hit() function", () => {
  const ship = Ship("destroyer", 3);
  expect(ship).toHaveProperty("hit");
});

test("returns an object with an isSunk() function", () => {
  const ship = Ship("patrol boat", 2);
  expect(ship).toHaveProperty("isSunk");
});

describe("isSunk() method", () => {
  test("works properly when not sunk", () => {
    let ship = Ship(5);
    let isSunk = ship.isSunk();
    expect(isSunk).toBe(false);
  });

  test("works properly when sunk", () => {
    let ship = Ship("destroyer", 3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    let isSunk = ship.isSunk();
    expect(isSunk).toBe(true);
  });
});

describe("hit() method", () => {
  test("updates shipBlock at correct location", () => {
    let ship = Ship("battleship", 4);
    ship.hit(3);
    expect(ship.getShipBlocks()[3]).toBeNull();
  });
});

describe("getShipBlocks() method", () => {
  test("returns correct shipBlocks array", () => {
    let ship = Ship("carrier", 5);
    expect(ship.getShipBlocks().length).toBe(5);
  });
});
