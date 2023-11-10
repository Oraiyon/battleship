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
