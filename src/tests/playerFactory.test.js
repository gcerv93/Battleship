import playerFactory from "../appLogic/playerFactory";

test("returns an object with a playerTurn method", () => {
  let player = playerFactory("player1");
  expect(player).toHaveProperty("playerTurn");
});

describe("playerTurn method", () => {
  test("it sends the receieve attack message to enemyBoard", () => {
    let player = playerFactory("player1");
    let coords = [3, 3];
    let myMock = jest.fn();
    let enemyBoard = { receiveAttack: myMock };
    player.playerTurn(coords, enemyBoard);
    expect(myMock.mock.calls.length).toBe(1);
    expect(myMock.mock.calls[0][0]).toBe(coords);
  });
});
