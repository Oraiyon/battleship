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
  // Does does not reset when hits used coordinates
  placeShipsRandomly() {
    let index = 0;
    while (this.board.placedShips.length <= 5) {
      const randomX = Math.floor(Math.random() * 10);
      const randomY = Math.floor(Math.random() * 10);
      this.placeShip(this.board.ships[index].name, randomX, randomY);
      index++;
    }
  }
}
