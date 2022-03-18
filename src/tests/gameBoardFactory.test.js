import gameBoardFactory from "../appLogic/gameBoardFactory";

test("returns an object with a getBoard method", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("getBoard");
});

test("returns an object with a receiveAttack method", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("receiveAttack");
});

test("returns an object with a missed property", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("missed");
});

test("returns an object with a placeShip property", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("placeShip");
});

test("returns an object with a allSunk property", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("allSunk");
});

test("returns an object with a getShips method", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("getShips");
});

test("returns an object with a hits method", () => {
  let gameboard = gameBoardFactory();
  expect(gameboard).toHaveProperty("hits");
});

describe("object methods", () => {
  describe("placeShip", () => {
    describe("vertical positioning", () => {
      test("places the start of the ship correctly", () => {
        let ship = { name: "destroyer", length: 3 };
        let gameboard = gameBoardFactory();
        gameboard.placeShip([3, 3], "vertical", ship);
        expect(gameboard.getBoard()[3][3]).toEqual({
          ship: ship,
          name: "destroyer",
          index: 0,
          length: 3,
          hit: false,
        });
      });

      test("places the end of the ship correctly", () => {
        let ship = { name: "battleship", length: 4 };
        let gameboard = gameBoardFactory();
        gameboard.placeShip([2, 2], "vertical", ship);
        expect(gameboard.getBoard()[5][2]).toEqual({
          ship: ship,
          name: "battleship",
          index: 3,
          length: 4,
          hit: false,
        });
      });
    });

    describe("horizontal positioning", () => {
      test("places the start of the ship correctly", () => {
        let ship = { name: "patrol boat", length: 2 };
        let gameboard = gameBoardFactory();
        gameboard.placeShip([4, 4], "horizontal", ship);
        expect(gameboard.getBoard()[4][4]).toEqual({
          ship: ship,
          name: "patrol boat",
          length: 2,
          index: 0,
          hit: false,
        });
      });

      test("places the end of the ship correctly", () => {
        let ship = { name: "carrier", length: 5 };
        let gameboard = gameBoardFactory();
        gameboard.placeShip([2, 3], "horizontal", ship);
        expect(gameboard.getBoard()[2][7]).toEqual({
          ship: ship,
          name: "carrier",
          length: 5,
          index: 4,
          hit: false,
        });
      });
    });
  });

  describe("receiveAttack", () => {
    describe("when shot misses", () => {
      test("pushes coordinates to missed array when shot misses", () => {
        let gameboard = gameBoardFactory();
        let misses = gameboard.missed.length;
        gameboard.receiveAttack([3, 3]);
        expect(gameboard.missed.length).toBe(misses + 1);
      });
    });

    describe("when shot hits", () => {
      test("changes object at location's hit property to true", () => {
        let gameboard = gameBoardFactory();
        let myMock = jest.fn();
        const myOtherMock = jest.fn();
        let ship = {
          name: "submarine",
          length: 3,
          hit: myMock,
          isSunk: myOtherMock,
        };
        gameboard.placeShip([3, 3], "vertical", ship);
        gameboard.receiveAttack([3, 3]);
        expect(gameboard.getBoard()[3][3].hit).toBe(true);
      });

      test("sends the hit function to the ship", () => {
        let gameboard = gameBoardFactory();
        const myMock = jest.fn();
        const myOtherMock = jest.fn();
        let ship = {
          name: "destroyer",
          length: 3,
          hit: myMock,
          isSunk: myOtherMock,
        };
        gameboard.placeShip([2, 2], "horizontal", ship);
        gameboard.receiveAttack([2, 2]);
        expect(myMock.mock.calls.length).toBe(1);
        expect(myMock.mock.calls[0][0]).toBe(0);
      });

      test("sends the isSunk message to the ship", () => {
        let gameboard = gameBoardFactory();
        const myMock = jest.fn();
        const myOtherMock = jest.fn();
        let ship = {
          name: "submarine",
          length: 3,
          hit: myOtherMock,
          isSunk: myMock,
        };
        gameboard.placeShip([4, 4], "horizontal", ship);
        gameboard.receiveAttack([4, 4]);
        expect(myMock.mock.calls.length).toBe(1);
      });

      test("removes ship from ships array if ship is sunk", () => {
        let gameboard = gameBoardFactory();
        const myMock = jest.fn();
        const myOtherMock = jest.fn();
        const shipsArrayLength = gameboard.getShips().length;
        let ship = {
          name: "patrol boat",
          length: 2,
          hit: myOtherMock,
          isSunk: myMock,
        };
        myMock.mockReturnValue(true);
        gameboard.placeShip([3, 3], "horizontal", ship);
        gameboard.receiveAttack([3, 3]);
        expect(gameboard.getShips().length).toBe(shipsArrayLength - 1);
      });

      test("adds hits to hits array when shot hits", () => {
        let gameboard = gameBoardFactory();
        const myMock = jest.fn();
        const myOtherMock = jest.fn();
        const hitsArrayLength = gameboard.hits.length;
        let ship = {
          name: "submarine",
          length: 3,
          hit: myOtherMock,
          isSunk: myMock,
        };
        myMock.mockReturnValue(true);
        gameboard.placeShip([2, 2], "horizontal", ship);
        gameboard.receiveAttack([2, 2]);
        expect(gameboard.hits.length).toBe(hitsArrayLength + 1);
      });
    });
  });

  describe("allSunk", () => {
    test("returns false when not all ships have been sunk", () => {
      let gameboard = gameBoardFactory();
      const result = gameboard.allSunk();
      expect(result).toBe(false);
    });

    test("returns true when all ships are sunk", () => {
      let gameboard = gameBoardFactory();
      let ships = [];
      const result = gameboard.allSunk(ships);
      expect(result).toBe(true);
    });
  });
});
