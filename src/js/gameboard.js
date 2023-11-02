import { Ship } from "./ship";

export class Gameboard {
  constructor() {
    this.board = [];
    this.allShots = [];
    this.hitShots = [];
    this.missedShots = [];
    this.playerShips = [];
    this.enemyShips = [];
    this.sunkenShips = [];
  }

  createGameboard() {
    if (this.board.length === 0) {
      for (let i = 0; i < 10; i++) {
        this.board.push(["", "", "", "", "", "", "", "", "", ""]);
      }
    }
  }
}
