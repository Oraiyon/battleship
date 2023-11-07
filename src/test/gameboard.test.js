import { Gameboard } from "../js/gameboard";

describe("Tests for Gameboard properties", () => {
  let gameBoard = null;
  beforeEach(() => {
    gameBoard = new Gameboard();
  });

  test("Checks if Gameboard is created only once", () => {
    gameBoard.createGameboard();
    expect(gameBoard.board.length).toBe(10);
  });

  test("Checks if ships are created for player", () => {
    gameBoard.createGameboard();
    expect(gameBoard.playerShips.length).toBe(5);
    expect(gameBoard.enemyShips.length).toBe(5);
  });

  test("Checks if ship can be realigned", () => {
    gameBoard.createGameboard();
    gameBoard.realign("Carrier");
    expect(gameBoard.playerShips[0].alignment).toBe("Vertical");
  });

  test("Checks if player ships can be placed on gameboard", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 5, 2);
    expect(gameBoard.board[2 - 1][5 - 1]).toBe("Destroyer");
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go past 10", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 10, 3);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([8, 3]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([10, 3]);
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go below 0", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Carrier", 1, 3);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([1, 3]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([5, 3]);
  });

  test("Checks if player's vertical ship's y coordinates DO NOT go past 10", () => {
    gameBoard.createGameboard();
    gameBoard.realign("Destroyer");
    gameBoard.placePlayerShip("Destroyer", 3, 10);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([3, 8]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([3, 10]);
  });

  test("Checks if player's vertical ship's y coordinates DO NOT go below 0", () => {
    gameBoard.createGameboard();
    gameBoard.realign("Destroyer");
    gameBoard.placePlayerShip("Destroyer", 3, 1);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([3, 1]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([3, 3]);
  });

  test("Checks if ship is a duplicate of an already placed ship", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Destroyer", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used x coordinate", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Submarine", 5, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used y coordinate", () => {
    gameBoard.createGameboard();
    gameBoard.realign("Destroyer");
    gameBoard.placePlayerShip("Destroyer", 6, 1);
    gameBoard.realign("Carrier");
    expect(gameBoard.placePlayerShip("Carrier", 6, 5)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (1)", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 5, 3);
    expect(gameBoard.placePlayerShip("Carrier", 1, 3)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (2)", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 5, 3);
    expect(gameBoard.placePlayerShip("Carrier", 10, 3)).toBeNull();
  });
});
