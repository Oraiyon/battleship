import { Gameboard } from "../js/gameboard";

describe("Tests for Gameboard properties", () => {
  let gameBoard = null;
  beforeEach(() => {
    gameBoard = new Gameboard();
    gameBoard.createGameboard();
  });

  test("Checks if gameboard is created", () => {
    expect(gameBoard.board.length).toBe(10);
  });

  test("Checks if ships are created for player", () => {
    expect(gameBoard.ships.length).toBe(5);
  });

  test("Checks if ship can be realigned", () => {
    gameBoard.realign("Carrier");
    expect(gameBoard.ships[0].alignment).toBe("Vertical");
  });

  test("Checks if player ships can be placed on gameboard", () => {
    gameBoard.placeShip("Destroyer", 5, 2);
    expect(gameBoard.board[2 - 1][5 - 1]).toBe("Destroyer");
  });

  test("Checks if player ships can ONLY be placed within bounds", () => {
    expect(gameBoard.placeShip("Destroyer", 11, 1)).toBeNull();
    expect(gameBoard.placeShip("Destroyer", 1, 11)).toBeNull();
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go past 10", () => {
    gameBoard.placeShip("Destroyer", 10, 3);
    expect(gameBoard.placedShips[0].coordinates[0]).toEqual([8, 3]);
    expect(
      gameBoard.placedShips[0].coordinates[
        gameBoard.placedShips[0].coordinates.length - 1
      ],
    ).toEqual([10, 3]);
  });

  test("Checks if player's horizontal ship's x coordinates DO NOT go below 0", () => {
    gameBoard.placeShip("Carrier", 1, 3);
    expect(gameBoard.placedShips[0].coordinates[0]).toEqual([1, 3]);
    expect(
      gameBoard.placedShips[0].coordinates[
        gameBoard.placedShips[0].coordinates.length - 1
      ],
    ).toEqual([5, 3]);
  });

  test("Checks if player's vertical ship's y coordinates DO NOT go past 10", () => {
    gameBoard.realign("Destroyer");
    gameBoard.placeShip("Destroyer", 3, 10);
    expect(gameBoard.placedShips[0].coordinates[0]).toEqual([3, 8]);
    expect(
      gameBoard.placedShips[0].coordinates[
        gameBoard.placedShips[0].coordinates.length - 1
      ],
    ).toEqual([3, 10]);
  });

  test("Checks if player's vertical ship's y coordinates DO NOT go below 0", () => {
    gameBoard.realign("Destroyer");
    gameBoard.placeShip("Destroyer", 3, 1);
    expect(gameBoard.placedShips[0].coordinates[0]).toEqual([3, 1]);
    expect(
      gameBoard.placedShips[0].coordinates[
        gameBoard.placedShips[0].coordinates.length - 1
      ],
    ).toEqual([3, 3]);
  });

  test("Checks if ship is a duplicate of an already placed ship", () => {
    gameBoard.placeShip("Destroyer", 3, 2);
    expect(gameBoard.placeShip("Destroyer", 4, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used x coordinate", () => {
    gameBoard.placeShip("Destroyer", 3, 2);
    expect(gameBoard.placeShip("Submarine", 5, 2)).toBeNull();
  });

  test("Checks if ship is placed on a used y coordinate", () => {
    gameBoard.realign("Destroyer");
    gameBoard.placeShip("Destroyer", 6, 1);
    gameBoard.realign("Carrier");
    expect(gameBoard.placeShip("Carrier", 6, 5)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (1)", () => {
    gameBoard.placeShip("Destroyer", 5, 3);
    expect(gameBoard.placeShip("Carrier", 1, 3)).toBeNull();
  });

  test("Checks if ship can NOT be placed on the x axis if there is no space for it (2)", () => {
    gameBoard.placeShip("Destroyer", 5, 3);
    expect(gameBoard.placeShip("Carrier", 10, 3)).toBeNull();
  });

  test("Checks if ship.coordinates.length === ship.length", () => {
    gameBoard.placeShip("PatrolBoat", 5, 3);
    expect(gameBoard.placedShips[0].coordinates.length).toEqual(
      gameBoard.placedShips[0].length,
    );
  });

  test("Checks if HORIZONTAL PatrolBoat && Battleship can be placed at the edge of board", () => {
    gameBoard.placeShip("PatrolBoat", 10, 10);
    expect(gameBoard.placedShips[0].coordinates[1]).toEqual([10, 10]);
    gameBoard.placeShip("Battleship", 1, 1);
    expect(gameBoard.placedShips[1].coordinates[0]).toEqual([1, 1]);
  });

  test("Checks if VERTICAL PatrolBoat && Battleship can be placed at the edge of board", () => {
    gameBoard.realign("PatrolBoat");
    gameBoard.placeShip("PatrolBoat", 10, 10);
    expect(gameBoard.placedShips[0].coordinates[1]).toEqual([10, 10]);
    gameBoard.realign("Battleship");
    gameBoard.placeShip("Battleship", 1, 1);
    expect(gameBoard.placedShips[1].coordinates[0]).toEqual([1, 1]);
  });

  test("Checks that attack() ONLY triggers when ALL ships have been placed", () => {
    expect(gameBoard.attack(1, 1)).toBeNull();
  });

  test("Checks that attack() ONLY triggers with valid coordinates", () => {
    expect(gameBoard.attack(11, 1)).toBeNull();
    expect(gameBoard.attack(1, 0)).toBeNull();
  });

  test("Checks that when attack() HITS a ship, that ship's hit count increases & playerHitShots records hit coordinates", () => {
    gameBoard.placeShip("Destroyer", 1, 1);
    gameBoard.placeShip("PatrolBoat", 10, 3);
    gameBoard.placeShip("Carrier", 1, 10);
    gameBoard.placeShip("Battleship", 3, 8);
    gameBoard.placeShip("Submarine", 9, 6);
    gameBoard.attack(1, 1);
    expect(gameBoard.placedShips[0].hits).toBe(1);
    expect(gameBoard.hitShots[0]).toEqual([1, 1]);
  });

  test("Checks that when attack() MISSES a ship, playerMissedShots records missed coordinates", () => {
    gameBoard.placeShip("Destroyer", 1, 1);
    gameBoard.placeShip("PatrolBoat", 10, 3);
    gameBoard.placeShip("Carrier", 1, 10);
    gameBoard.placeShip("Battleship", 3, 8);
    gameBoard.placeShip("Submarine", 9, 6);
    gameBoard.attack(10, 10);
    expect(gameBoard.missedShots[0]).toEqual([10, 10]);
  });

  test("Checks that attack() DOES NOT trigger on used coordinates", () => {
    gameBoard.placeShip("Destroyer", 1, 1);
    gameBoard.placeShip("PatrolBoat", 10, 3);
    gameBoard.placeShip("Carrier", 1, 10);
    gameBoard.placeShip("Battleship", 3, 8);
    gameBoard.placeShip("Submarine", 9, 6);
    gameBoard.attack(10, 10);
    expect(gameBoard.attack(10, 10)).toBeNull();
    gameBoard.attack(1, 1);
    expect(gameBoard.attack(1, 1)).toBeNull();
  });

  test("Checks if ships can be SUNK when hits === length", () => {
    gameBoard.placeShip("Destroyer", 1, 1);
    gameBoard.placeShip("PatrolBoat", 10, 3);
    gameBoard.placeShip("Carrier", 1, 10);
    gameBoard.placeShip("Battleship", 3, 8);
    gameBoard.placeShip("Submarine", 9, 6);
    gameBoard.attack(1, 1);
    gameBoard.attack(2, 1);
    gameBoard.attack(3, 1);
    expect(gameBoard.placedShips[0].sunk).toBeTruthy();
  });

  test("Checks if sunken ships are recorded", () => {
    gameBoard.placeShip("Destroyer", 1, 1);
    gameBoard.placeShip("PatrolBoat", 10, 3);
    gameBoard.placeShip("Carrier", 1, 10);
    gameBoard.placeShip("Battleship", 3, 8);
    gameBoard.placeShip("Submarine", 9, 6);
    gameBoard.attack(1, 1);
    gameBoard.attack(2, 1);
    gameBoard.attack(3, 1);
    expect(gameBoard.sunkenShips).toHaveLength(1);
  });
});
