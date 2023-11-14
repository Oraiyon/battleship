import { Gameboard } from "./gameboard";

export class Player {
  constructor(name) {
    this.name = name;
    this.board = new Gameboard();
  }

  createGameboard() {
    this.board.createGameboard();
  }

  realign(shipName) {
    this.board.realign(shipName);
  }

  placeShip(shipName, x, y) {
    this.board.placeShip(shipName, x, y);
  }

  attack(enemy, x, y) {
    enemy.board.attack(x, y);
  }
}

export class Computer extends Player {
  // REDUCE RANDOMNESS
  // CAUSING LONG WAIT TIMES
  // Allow vertical alignment
  placeShipsRandomly() {
    for (let i = 0; i < this.board.ships.length; i++) {
      while (i === this.board.placedShips.length) {
        const randomShip = this.board.ships[i].name;
        const randomX = Math.floor(Math.random() * 10) + 1;
        const randomY = Math.floor(Math.random() * 10) + 1;
        this.placeShip(randomShip, randomX, randomY);
      }
    }
  }

  computerAttacks(enemy) {
    const randomX = Math.floor(Math.random() * 10) + 1;
    const randomY = Math.floor(Math.random() * 10) + 1;
    if (
      enemy.board.hitShots.some(
        (coordinates) =>
          coordinates[0] === randomX && coordinates[1] === randomY,
      ) ||
      enemy.board.missedShots.some(
        (coordinates) =>
          coordinates[0] === randomX && coordinates[1] === randomY,
      )
    ) {
      this.computerAttacks(enemy);
    }
    this.attack(enemy, randomX, randomY);
    return true;
  }
}
