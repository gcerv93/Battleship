import shipFactory from "../shipFactory";

test("returns an object with the correct length property", () => {
  const ship = shipFactory(6);
  expect(ship).toHaveProperty("length");
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
  let ship = shipFactory(5);

  test("works properly when not sunk", () => {
    let isSunk = ship.isSunk();
    expect(isSunk).toBe(false);
  });

  ship = shipFactory(0);
  test("works properly when sunk", () => {
    let isSunk = ship.isSunk();
    ship.hit(0);
    expect(isSunk).toBe(true);
  });
});

describe("hit() method", () => {
  test("updates shipBlock at correct location", () => {
    let ship = shipFactory(4);
    ship.hit(3);
    expect(ship.shipBlocks[3]).toBeNull();
  });
});
