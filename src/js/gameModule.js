import { Player, Computer } from "./player";

// will be used to place player ships
const createPlayerBoard = (player) => {
  const playerBoard = document.querySelector(`.playerBoard`);

  player.board.board.forEach((row) => {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    playerBoard.appendChild(boardRow);

    for (let i = 0; i < row.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      boardRow.appendChild(cell);
    }
  });
};

// will be used to attack computer ships
const createComputerBoard = (computer, player) => {
  const computerBoard = document.querySelector(`.computerBoard`);

  computer.board.board.forEach((row, index) => {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    computerBoard.appendChild(boardRow);

    for (let i = 0; i < row.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      boardRow.appendChild(cell);
      takeTurns(cell, player, computer, i, index);
    }
  });
};

const takeTurns = (cell, player, computer, i, index) => {
  cell.addEventListener("click", () => {
    player.attack(computer, i + 1, index + 1);
    computer.computerAttacks(player);
  });
};

export const createGame = () => {
  const player = new Player("Player");
  const computer = new Computer("Computer");

  player.createGameboard();
  computer.createGameboard();

  createPlayerBoard(player);
  createComputerBoard(computer, player);

  player.placeShip("Carrier", 1, 1);
  player.placeShip("Battleship", 1, 2);
  player.placeShip("Destroyer", 1, 3);
  player.placeShip("Submarine", 1, 4);
  player.placeShip("PatrolBoat", 1, 5);

  computer.placeShip("Carrier", 1, 1);
  computer.placeShip("Battleship", 1, 2);
  computer.placeShip("Destroyer", 1, 3);
  computer.placeShip("Submarine", 1, 4);
  computer.placeShip("PatrolBoat", 1, 5);

  console.log(player.board);
  console.log(player.board.board);
};
