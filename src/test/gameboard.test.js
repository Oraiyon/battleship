import { Gameboard } from "../js/gameboard";

describe("Tests for Gameboard properties", () => {
  let gameBoard = null;
  beforeEach(() => {
    gameBoard = new Gameboard();
    gameBoard.createGameboard();
  });

  test("Checks if Gameboard is created only once", () => {
    expect(gameBoard.board.length).toBe(10);
  });

  test("Checks if ships are created for player", () => {
    expect(gameBoard.playerShips.length).toBe(5);
    expect(gameBoard.enemyShips.length).toBe(5);
  });

  test("Checks if ship can be realigned", () => {
    gameBoard.realign("Carrier");
    expect(gameBoard.playerShips[0].alignment).toBe("Vertical");
  });

  test("Checks if player ships can be placed on gameboard", () => {
    gameBoard.placePlayerShip("Destroyer", 5, 2);
    expect(gameBoard.board[2 - 1][5 - 1]).toBe("Destroyer");
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go past 10", () => {
    gameBoard.placePlayerShip("Destroyer", 10, 3);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([8, 3]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([10, 3]);
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go below 0", () => {
    gameBoard.placePlayerShip("Carrier", 1, 3);
    expect(gameBoard.placedPlayerShips[0].coordinates[0]).toEqual([1, 3]);
    expect(
      gameBoard.placedPlayerShips[0].coordinates[
        gameBoard.placedPlayerShips[0].coordinates.length - 1
      ],
    ).toEqual([5, 3]);
  });

  test("Checks if player's vertical ship's y coordinates DO NOT go past 10", () => {
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
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Destroyer", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used x coordinate", () => {
    gameBoard.placePlayerShip("Destroyer", 3, 2);
    expect(gameBoard.placePlayerShip("Submarine", 5, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used y coordinate", () => {
    gameBoard.realign("Destroyer");
    gameBoard.placePlayerShip("Destroyer", 6, 1);
    gameBoard.realign("Carrier");
    expect(gameBoard.placePlayerShip("Carrier", 6, 5)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (1)", () => {
    gameBoard.placePlayerShip("Destroyer", 5, 3);
    expect(gameBoard.placePlayerShip("Carrier", 1, 3)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (2)", () => {
    gameBoard.placePlayerShip("Destroyer", 5, 3);
    expect(gameBoard.placePlayerShip("Carrier", 10, 3)).toBeNull();
  });

  test("Checks if ship.coordinates.length === ship.length", () => {
    gameBoard.placePlayerShip("PatrolBoat", 5, 3);
    expect(gameBoard.placedPlayerShips[0].coordinates.length).toEqual(
      gameBoard.placedPlayerShips[0].length,
    );
  });

  test("Checks if HORIZONTAL PatrolBoat && Battleship can be placed at the edge of board", () => {
    gameBoard.placePlayerShip("PatrolBoat", 10, 10);
    expect(gameBoard.placedPlayerShips[0].coordinates[1]).toEqual([10, 10]);
    gameBoard.placePlayerShip("Battleship", 1, 1);
    expect(gameBoard.placedPlayerShips[1].coordinates[0]).toEqual([1, 1]);
  });

  test("Checks if VERTICAL PatrolBoat && Battleship can be placed at the edge of board", () => {
    gameBoard.realign("PatrolBoat");
    gameBoard.placePlayerShip("PatrolBoat", 10, 10);
    expect(gameBoard.placedPlayerShips[0].coordinates[1]).toEqual([10, 10]);
    gameBoard.realign("Battleship");
    gameBoard.placePlayerShip("Battleship", 1, 1);
    expect(gameBoard.placedPlayerShips[1].coordinates[0]).toEqual([1, 1]);
  });

  test("Checks that attack() does not trigger when NOT all ships have been placed", () => {
    expect(gameBoard.attack(1, 1)).toBeNull();
  });

  test("Checks that attack() ONLY triggers with valid coordinates", () => {
    expect(gameBoard.attack(11, 1)).toBeNull();
    expect(gameBoard.attack(1, 0)).toBeNull();
  });
});
