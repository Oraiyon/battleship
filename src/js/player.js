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

  attack(enemy, x, y, name = this.name) {
    enemy.board.attack(x, y, name);
  }

  // will be used to place player ships
  // MIGHT BE REPLACED BY createComputerBoard();
  // NOT USED BY COMPUTER CHILD, SO IT VIOLATES SOLID PRINCIPLES
  createPlayerBoard() {
    const playerBoard = document.querySelector(`.playerBoard`);

    this.board.board.forEach((row) => {
      const boardRow = document.createElement("div");
      boardRow.classList.add("boardRow");
      playerBoard.appendChild(boardRow);

      for (let i = 0; i < row.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        boardRow.appendChild(cell);
      }
    });
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

  // will be used to attack computer ships
  createComputerBoard(computer, player) {
    const computerBoard = document.querySelector(`.computerBoard`);

    this.board.board.forEach((row, index) => {
      const boardRow = document.createElement("div");
      boardRow.classList.add("boardRow");
      computerBoard.appendChild(boardRow);

      for (let i = 0; i < row.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        boardRow.appendChild(cell);
        this.takeTurns(cell, player, computer, i, index, computerBoard);
      }
    });
  }

  takeTurns(cell, player, computer, i, index, computerBoard) {
    cell.addEventListener("click", () => {
      const currentLength = this.board.sunkenShips.length;
      player.attack(computer, i + 1, index + 1);
      computer.computerAttacks(player);
      this.displayAttack(cell, i, index);
      this.displaySunkenShips(computerBoard, currentLength);
    });
  }

  displayAttack(cell, i, index) {
    cell.setAttribute("style", "background-color: gray;");
    // Stops causing errors when hitShots.length === 0
    if (this.board.hitShots.length === 0) {
      return;
    }
    if (
      this.board.hitShots[this.board.hitShots.length - 1][0] === i + 1 &&
      this.board.hitShots[this.board.hitShots.length - 1][1] === index + 1
    ) {
      cell.setAttribute("style", "background-color: green;");
    }
  }

  displaySunkenShips(computerBoard, currentLength) {
    if (currentLength < this.board.sunkenShips.length) {
      const sunkens = document.createElement("div");
      sunkens.classList.add("sunkens");
      computerBoard.appendChild(sunkens);

      this.board.sunkenShips.forEach((ship) => {
        sunkens.innerText = ship.name;
      });
    }
  }
}
