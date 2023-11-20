import { Player, Computer } from "./player";

const createPlayerBoard = (user) => {
  let userBoard = document.querySelector(`.playerBoard`);

  if (user.name === "Computer") {
    userBoard = document.querySelector(`.computerBoard`);
  }

  user.board.board.forEach((row) => {
    const boardRow = document.createElement("div");
    boardRow.classList.add("boardRow");
    userBoard.appendChild(boardRow);

    for (let i = 0; i < row.length; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      boardRow.appendChild(cell);
    }
  });
};

export const createGame = () => {
  const player = new Player("User");
  const computer = new Computer("Computer");

  player.createGameboard();
  computer.createGameboard();

  createPlayerBoard(player);
  createPlayerBoard(computer);

  // player.placeShip("Carrier", 1, 1);
  // player.placeShip("Battleship", 1, 2);
  // player.placeShip("Destroyer", 1, 3);
  // player.placeShip("Submarine", 1, 4);
  // player.placeShip("PatrolBoat", 1, 5);

  // computer.placeShip("Carrier", 1, 1);
  // computer.placeShip("Battleship", 1, 2);
  // computer.placeShip("Destroyer", 1, 3);
  // computer.placeShip("Submarine", 1, 4);
  // computer.placeShip("PatrolBoat", 1, 5);

  console.log(player.board);
  console.log(player.board.board);

  // while (player.board.sunkenShips.length !== 5 || computer.board.sunkenShips.length !== 5) {
  //   const x = parseInt(prompt("Choose a X"));
  //   const y = parseInt(prompt("Choose a Y"));
  //   player.attack(computer, x, y);
  //   computer.computerAttacks(player);
  // }
};
