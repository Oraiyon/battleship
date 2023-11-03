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
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.board[2 - 1][3 - 1].name).toBe("Destroyer");
    expect(gameBoard.placedPlayerShips[0].name).toBe("Destroyer");
    expect(gameBoard.placedPlayerShips[0].coordinates).toEqual([3, 2]);
  });

  test("Checks if ship is a duplicate of an already placed ship", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Destroyer", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used coordinate", () => {
    gameBoard.createGameboard();
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Carrier", 3, 2)).toBeNull();
  });
});
