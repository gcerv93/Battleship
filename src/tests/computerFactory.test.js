import computerFactory from "../computerFactory";

test("returns an object with a compTurn method", () => {
  let computer = computerFactory();
  expect(computer).toHaveProperty("compTurn");
});

test("returns an object with a generateMove method", () => {
  let computer = computerFactory();
  expect(computer).toHaveProperty("generateMove");
});

describe("generateMove method", () => {
  test("returns a 2 element array", () => {
    let computer = computerFactory();
    let move = computer.generateMove();
    expect(move.length).toBe(2);
  });

  test("first element in return value falls in range 0-9", () => {
    let computer = computerFactory();
    let move = computer.generateMove();
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThanOrEqual(9);
  });

  test("second element in return value falls in range 0-9", () => {
    let computer = computerFactory();
    let move = computer.generateMove();
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThanOrEqual(9);
  });
});

describe("compTurn method", () => {
  test("sends the receiveAttack message to enemyBoard", () => {
    let computer = computerFactory();
    let coords = [3, 3];
    let myMock = jest.fn();
    let enemyBoard = { receiveAttack: myMock };
    computer.compTurn(coords, enemyBoard);
    expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.mock.calls[0][0]).toBe(coords);
  });
});
