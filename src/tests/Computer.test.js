import Computer from "../appLogic/Factories/Computer";

test("returns an object with a compTurn method", () => {
  let computer = Computer();
  expect(computer).toHaveProperty("compTurn");
});

test("returns an object with a generateMove method", () => {
  let computer = Computer();
  expect(computer).toHaveProperty("generateMove");
});

test("returns an object with a generatePlacement method", () => {
  let computer = Computer();
  expect(computer).toHaveProperty("generatePlacement");
});

test("returns an object with a previousMoves property", () => {
  let computer = Computer();
  expect(computer).toHaveProperty("previousMoves");
});

describe("generateMove method", () => {
  test("returns a 2 element array", () => {
    let computer = Computer();
    let move = computer.generateMove();
    expect(move.length).toBe(2);
  });

  test("first element in return value falls in range 0-9", () => {
    let computer = Computer();
    let move = computer.generateMove();
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThanOrEqual(9);
  });

  test("second element in return value falls in range 0-9", () => {
    let computer = Computer();
    let move = computer.generateMove();
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThanOrEqual(9);
  });
});

describe("compTurn method", () => {
  test("sends the receiveAttack message to enemyBoard", () => {
    let computer = Computer();
    let myMock = jest.fn();
    let enemyBoard = { receiveAttack: myMock };
    computer.compTurn(enemyBoard);
    expect(myMock.mock.calls.length).toBe(1);
  });

  test("pushes move into previousMoves array", () => {
    let computer = Computer();
    let myMock = jest.fn();
    let previousMoves = computer.previousMoves.length;
    computer.compTurn({ receiveAttack: myMock });
    expect(computer.previousMoves.length).toBe(previousMoves + 1);
  });
});

describe("generatePlacement method", () => {
  test("returns an array with 2 values", () => {
    let computer = Computer();
    let result = computer.generatePlacement();
    expect(result.length).toBe(2);
  });

  test("second element in return value is a string", () => {
    let computer = Computer();
    let result = computer.generatePlacement();
    expect(typeof result[1]).toBe("string");
  });
});
