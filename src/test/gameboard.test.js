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

  test("Checks if player ships can be placed on gameboard without going out of bounds", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Carrier", 10, 2);
    expect(gameBoard.board[2 - 1][10 - 1].name).toBe("Carrier");
    expect(gameBoard.placedPlayerShips[0].name).toBe("Carrier");
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([6, 2]);
  });

  test("Checks if ship is a duplicate of an already placed ship", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Carrier", 3, 2);
    expect(gameBoard.placePlayerShip("Carrier", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used coordinate", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Carrier", 3, 2);
    expect(gameBoard.placePlayerShip("Carrier", 3, 2)).toBeNull();
  });
});
