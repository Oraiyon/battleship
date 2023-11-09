import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.playerBoard = [];
    this.enemyBoard = [];
    this.playerShips = [];
    this.enemyShips = [];
    this.placedPlayerShips = [];
    this.playerHitShots = [];
    this.playerMissedShots = [];
    this.playerSunkenShips = [];
  }

  createGameboard() {
    if (this.playerBoard.length === 0) {
      for (let i = 0; i < 10; i++) {
        this.playerBoard.push(["", "", "", "", "", "", "", "", "", ""]);
        this.enemyBoard.push(["", "", "", "", "", "", "", "", "", ""]);
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

  realign(shipName) {
    const ship = this.playerShips.find((ship) => ship.name === shipName);
    ship.alignment === "Horizontal"
      ? (ship.alignment = "Vertical")
      : (ship.alignment = "Horizontal");
  }

  placePlayerShip(shipName, x, y) {
    const ship = this.playerShips.find((ship) => ship.name === shipName);
    const mid = Math.floor(ship.length / 2);

    if (this.placedPlayerShips.find((ship) => ship.name === shipName)) {
      return null;
    }

    if (
      (shipName === "Carrier" ||
        shipName === "Battleship" ||
        shipName === "Destroyer" ||
        shipName === "Submarine" ||
        shipName === "PatrolBoat") &&
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

        while (ship.coordinates[0][0] < 1) {
          ship.coordinates.map((x) => (x[0] = x[0] + 1));
        }
      } else if (ship.alignment === "Vertical") {
        for (let i = y - mid; i <= y + mid; i++) {
          ship.coordinates.push([x, i]);
        }

        while (ship.coordinates[ship.coordinates.length - 1][1] > 10) {
          ship.coordinates.map((y) => (y[1] = y[1] - 1));
        }

        while (ship.coordinates[0][1] < 1) {
          ship.coordinates.map((y) => (y[1] = y[1] + 1));
        }
      }

      for (let i = 0; i < this.placedPlayerShips.length; i++) {
        for (let z = 0; z < this.placedPlayerShips[i].coordinates.length; z++) {
          if (
            (ship.coordinates[0][0] ===
              this.placedPlayerShips[i].coordinates[z][0] &&
              ship.coordinates[0][1] ===
                this.placedPlayerShips[i].coordinates[z][1]) ||
            (ship.coordinates[mid][0] ===
              this.placedPlayerShips[i].coordinates[z][0] &&
              ship.coordinates[mid][1] ===
                this.placedPlayerShips[i].coordinates[z][1]) ||
            (ship.coordinates[ship.coordinates.length - 1][0] ===
              this.placedPlayerShips[i].coordinates[z][0] &&
              ship.coordinates[ship.coordinates.length - 1][1] ===
                this.placedPlayerShips[i].coordinates[z][1])
          ) {
            return null;
          }
        }
      }

      if (
        (ship.coordinates.length > ship.length &&
          ship.alignment === "Horizontal" &&
          x === 1) ||
        (ship.coordinates.length > ship.length &&
          ship.alignment === "Vertical" &&
          y === 1)
      ) {
        ship.coordinates.pop();
      } else if (
        (ship.coordinates.length > ship.length &&
          ship.alignment === "Horizontal" &&
          x === 10) ||
        (ship.coordinates.length > ship.length &&
          ship.alignment === "Vertical" &&
          y === 10) ||
        ship.coordinates.length > ship.length
      ) {
        ship.coordinates.shift();
      }

      this.placedPlayerShips.push(ship);

      ship.coordinates.forEach((coord) => {
        this.playerBoard[coord[1] - 1][coord[0] - 1] = ship.name;
      });
    } else {
      return null;
    }
  }

  attack(x, y) {
    if (
      this.placedPlayerShips.length !== 5 ||
      x < 0 ||
      x > 10 ||
      y < 0 ||
      y > 10 ||
      this.playerMissedShots.some(
        (coordinates) => coordinates[0] === x && coordinates[1] === y,
      ) ||
      this.playerHitShots.some(
        (coordinates) => coordinates[0] === x && coordinates[1] === y,
      )
    ) {
      return null;
    }

    // REPLACE placedPlayerShips with placedEnemyShips when targeting enemy
    for (let i = 0; i < this.placedPlayerShips.length; i++) {
      for (let z = 0; z < this.placedPlayerShips[i].coordinates.length; z++) {
        if (
          this.placedPlayerShips[i].coordinates[z][0] === x &&
          this.placedPlayerShips[i].coordinates[z][1] === y
        ) {
          this.placedPlayerShips[i].hit();
          if (this.placedPlayerShips[i].sunk === true) {
            this.playerSunkenShips.push(this.placedPlayerShips[i]);
          }
          this.playerHitShots.push([x, y]);
          return;
        }
      }
    }

    this.playerMissedShots.push([x, y]);
  }
}
