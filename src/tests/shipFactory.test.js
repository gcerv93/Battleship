import shipFactory from "../shipFactory";

test("returns an object with the correct length property", () => {
  const ship = shipFactory(6);
  expect(ship.length).toBe(6);
});

test("returns an object with a hit() function", () => {
  const ship = shipFactory(3);
  expect(ship).toHaveProperty("hit");
});

test("returns an object with an isSunk() function", () => {
  const ship = shipFactory(2);
  expect(ship).toHaveProperty("isSunk");
});

describe("isSunk() method", () => {
  test("works properly when not sunk", () => {
    let ship = shipFactory(5);
    let isSunk = ship.isSunk();
    expect(isSunk).toBe(false);
  });

  test("works properly when sunk", () => {
    let ship = shipFactory(3);
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    let isSunk = ship.isSunk();
    expect(isSunk).toBe(true);
  });
});

describe("hit() method", () => {
  test("updates shipBlock at correct location", () => {
    let ship = shipFactory(4);
    ship.hit(3);
    expect(ship.getShipBlocks()[3]).toBeNull();
  });
});

describe("getShipBlocks() method", () => {
  test("returns correct shipBlocks array", () => {
    let ship = shipFactory(5);
    expect(ship.getShipBlocks().length).toBe(5);
  });
});
