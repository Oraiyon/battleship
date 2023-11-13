import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.placedShips = [];
    this.hitShots = [];
    this.missedShots = [];
    this.sunkenShips = [];
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
    if (this.ships.length === 0) {
      const carrier = new Ship("Carrier", 5);
      const battleship = new Ship("Battleship", 4);
      const destroyer = new Ship("Destroyer", 3);
      const submarine = new Ship("Submarine", 3);
      const patrolBoat = new Ship("PatrolBoat", 2);
      this.ships.push(carrier, battleship, destroyer, submarine, patrolBoat);
    }
  }

  realign(shipName) {
    const ship = this.ships.find((ship) => ship.name === shipName);
    ship.alignment === "Horizontal"
      ? (ship.alignment = "Vertical")
      : (ship.alignment = "Horizontal");
  }

  placeShip(shipName, x, y) {
    const ship = this.ships.find((ship) => ship.name === shipName);
    const mid = Math.floor(ship.length / 2);

    if (this.placedShips.find((ship) => ship.name === shipName)) {
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

      for (let i = 0; i < this.placedShips.length; i++) {
        for (let z = 0; z < this.placedShips[i].coordinates.length; z++) {
          if (
            (ship.coordinates[0][0] === this.placedShips[i].coordinates[z][0] &&
              ship.coordinates[0][1] ===
                this.placedShips[i].coordinates[z][1]) ||
            (ship.coordinates[mid - 1][0] ===
              this.placedShips[i].coordinates[z][0] &&
              ship.coordinates[mid - 1][1] ===
                this.placedShips[i].coordinates[z][1]) ||
            (ship.coordinates[mid][0] ===
              this.placedShips[i].coordinates[z][0] &&
              ship.coordinates[mid][1] ===
                this.placedShips[i].coordinates[z][1]) ||
            (ship.coordinates[mid + 1][0] ===
              this.placedShips[i].coordinates[z][0] &&
              ship.coordinates[mid + 1][1] ===
                this.placedShips[i].coordinates[z][1]) ||
            (ship.coordinates[ship.coordinates.length - 1][0] ===
              this.placedShips[i].coordinates[z][0] &&
              ship.coordinates[ship.coordinates.length - 1][1] ===
                this.placedShips[i].coordinates[z][1])
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

      this.placedShips.push(ship);
      ship.coordinates.forEach((coord) => {
        this.board[coord[1] - 1][coord[0] - 1] = ship.name;
      });
    } else {
      return null;
    }
  }

  attack(x, y) {
    if (
      this.placedShips.length !== 5 ||
      x < 0 ||
      x > 10 ||
      y < 0 ||
      y > 10 ||
      this.missedShots.some(
        (coordinates) => coordinates[0] === x && coordinates[1] === y,
      ) ||
      this.hitShots.some(
        (coordinates) => coordinates[0] === x && coordinates[1] === y,
      )
    ) {
      return null;
    }

    for (let i = 0; i < this.placedShips.length; i++) {
      for (let z = 0; z < this.placedShips[i].coordinates.length; z++) {
        if (
          this.placedShips[i].coordinates[z][0] === x &&
          this.placedShips[i].coordinates[z][1] === y
        ) {
          this.placedShips[i].hit();
          if (this.placedShips[i].sunk === true) {
            this.sunkenShips.push(this.placedShips[i]);
          }
          this.hitShots.push([x, y]);
          return;
        }
      }
    }

    this.missedShots.push([x, y]);
  }
}

// Games will be played with 2 boards
// Player will access enemy board to attack
// checkWinner() will be in gameModule.js
