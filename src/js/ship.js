export class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
    this.alignment = "Horizontal";
    this.coordinates = [];
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    this.length <= this.hits ? (this.sunk = true) : (this.sunk = false);
  }

  realign() {
    this.alignment === "Horizontal"
      ? (this.alignment = "Vertical")
      : (this.alignment = "Horizontal");
  }
}
