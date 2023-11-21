import { Player, Computer } from "./player";

export const createGame = () => {
  const player = new Player("Player");
  const computer = new Computer("Computer");

  player.createGameboard();
  computer.createGameboard();

  player.createPlayerBoard();
  computer.createComputerBoard(computer, player);

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
