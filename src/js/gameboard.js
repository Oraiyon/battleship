import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];
    this.allShots = [];
    this.hitShots = [];
    this.missedShots = [];
    this.playerShips = [];
    this.enemyShips = [];
    this.placedPlayerShips = [];
    this.sunkenPlayerShips = [];
    this.sunkenEnemyShips = [];
  }

  createGameboard() {
    if (this.board.length === 0) {
      for (let i = 0; i < 10; i++) {
        this.board.push(["", "", "", "", "", "", "", "", "", ""]);
      }
      this.createShips();
    }
  }

  createShips() {
    if (this.playerShips.length === 0 && this.enemyShips.length === 0) {
      const carrier = new Ship("Carrier", 5);
      const battleship = new Ship("Battleship", 4);
      const destroyer = new Ship("Destroyer", 3);
      const submarine = new Ship("Submarine", 3);
      const patrolBoat = new Ship("PatrolBoat", 2);
      this.playerShips.push(
        carrier,
        battleship,
        destroyer,
        submarine,
        patrolBoat,
      );
      this.enemyShips.push(
        carrier,
        battleship,
        destroyer,
        submarine,
        patrolBoat,
      );
    }
  }

  placePlayerShip(shipName, x, y) {
    if (
      this.placedPlayerShips.find((ship) => ship.name === shipName) ||
      this.placedPlayerShips.find(
        (ship) => ship.coordinates[0] === x && ship.coordinates[1] === y,
      )
    ) {
      return null;
    }

    if (
      (shipName === "Carrier" ||
        shipName === "Battleship" ||
        shipName === "Destroyer" ||
        shipName === "Submarine" ||
        shipName === "PatrolBoat") &&
      !this.placedPlayerShips.includes(shipName) &&
      y > 0 &&
      y <= 5 &&
      x > 0 &&
      x <= 10
    ) {
      const ship = this.playerShips.find((ship) => ship.name === shipName);
      // y is first index for this.board
      this.board[y - 1][x - 1] = ship;
      // Find way to factor in length of ship
      ship.coordinates = [x, y];
      this.placedPlayerShips.push(ship);
    } else {
      return null;
    }
  }
}
