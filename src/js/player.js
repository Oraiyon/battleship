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
  // Allow vertical alignment
  placeShipsRandomly() {
    while (this.board.placedShips.length !== 5) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      const randomShipIndex = Math.floor(
        Math.random() * this.board.ships.length,
      );
      this.placeShip(this.board.ships[randomShipIndex].name, randomX, randomY);
    }
  }
}
