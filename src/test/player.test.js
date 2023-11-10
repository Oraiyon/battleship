import { Player } from "../js/player";

describe("Tests for Player properties", () => {
  let playerOne = null;
  beforeEach(() => {
    playerOne = new Player("User");
    playerOne.createGameboard();
  });

  test("Checks if a new player is created", () => {
    expect(playerOne.name).toBe("User");
  });

  test("Checks if player can create gameboard", () => {
    expect(playerOne.board.board).toHaveLength(10);
  });

  test("Checks if player can realign ships", () => {
    playerOne.realign("Carrier");
    expect(playerOne.board.ships[0].name).toBe("Carrier");
  });

  test("Checks if player can place a ship on the board", () => {
    playerOne.placeShip("Carrier", 1, 1);
    expect(playerOne.board.placedShips[0].name).toBe("Carrier");
  });

  test("Checks if player ships can be attacked and therefore attack enemy", () => {
    const computer = new Player("Computer");
    computer.createGameboard();
    computer.placeShip("Carrier", 1, 1);
    computer.placeShip("Battleship", 1, 2);
    computer.placeShip("Destroyer", 1, 3);
    computer.placeShip("Submarine", 1, 4);
    computer.placeShip("PatrolBoat", 1, 5);
    playerOne.attack(computer, 1, 1);
    expect(computer.board.hitShots[0]).toEqual([1, 1]);
  });
});
