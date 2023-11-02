import { Gameboard } from "../js/gameboard";

describe("Tests for Gameboard properties", () => {
  let gameBoard = null;
  beforeEach(() => {
    gameBoard = new Gameboard();
  });

  test("Checks if Gameboard is created", () => {
    gameBoard.createGameboard();
    expect(gameBoard.board.length).toBe(10);
  });
});
