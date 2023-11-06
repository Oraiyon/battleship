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

  test("Checks if player ships can be placed on gameboard", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 5, 2);
    expect(gameBoard.board[2 - 1][5 - 1]).toBe("Destroyer");
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([4, 2]);
    expect(gameBoard.placedPlayerShips[0].coordinates[1]).toEqual([5, 2]);
    expect(gameBoard.placedPlayerShips[0].coordinates[2]).toEqual([6, 2]);
  });

  test("Checks if player ships can NOT be out of bounds", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 10, 3);
    expect(gameBoard.board[3 - 1][10 - 1]).toBe("Destroyer");
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([8, 3]);
    expect(gameBoard.placedPlayerShips[0].coordinates[1]).toEqual([9, 3]);
    expect(gameBoard.placedPlayerShips[0].coordinates[2]).toEqual([10, 3]);
  });

  test("Checks if ship is a duplicate of an already placed ship", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Destroyer", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used coordinate", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Submarine", 3, 2)).toBeNull();
    expect(gameBoard.placePlayerShip("Submarine", 5, 2)).toBeNull();
    // Destroyer's coordinates are [2, 2], [3, 2], [4, 2]
    // Submairine[5, 2]'s coordinates would start with [4, 2] causing a conflict which is why it's null
  });
});
