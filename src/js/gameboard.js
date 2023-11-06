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
    const ship = this.playerShips.find((ship) => ship.name === shipName);
    const mid = Math.floor(ship.length / 2);

    if (this.placedPlayerShips.find((ship) => ship.name === shipName)) {
      return null;
    }

    if (ship.alignment === "Horizontal") {
      if (
        this.placedPlayerShips.find((ship) =>
          ship.coordinates.find(
            (coords) => coords[0] === x + mid || coords[0] === x - mid,
          ),
        )
      ) {
        return null;
      }
    }

    if (
      (shipName === "Carrier" ||
        shipName === "Battleship" ||
        shipName === "Destroyer" ||
        shipName === "Submarine" ||
        shipName === "PatrolBoat") &&
      !this.placedPlayerShips.includes(shipName) &&
      x > 0 &&
      x <= 10 &&
      y > 0 &&
      y <= 10
    ) {
      if (ship.alignment === "Horizontal") {
        for (let i = x - mid; i <= x + mid; i++) {
          ship.coordinates.push([i, y]);
        }

        while (ship.coordinates[ship.coordinates.length - 1][0] > 10) {
          ship.coordinates.map((x) => (x[0] = x[0] - 1));
        }

        while (ship.coordinates[0][0] <= 0) {
          ship.coordinates.map((x) => (x[0] = x[0] + 1));
        }

        ship.coordinates.forEach((coord) => {
          this.board[coord[1] - 1][coord[0] - 1] = ship.name;
        });

        this.placedPlayerShips.push(ship);
      }
    } else {
      return null;
    }
  }
}
