import { Ship } from "../js/ship";

describe("Tests for ship properties", () => {
  let destroyer = null;
  beforeEach(() => {
    destroyer = new Ship("destroyer", 2);
  });

  test("Checks if ship can be hit", () => {
    destroyer.hit();
    expect(destroyer.hits).toBe(1);
  });

  test("Checks if ship can be sunk", () => {
    destroyer.hit();
    destroyer.hit();
    expect(destroyer.sunk).toBeTruthy();
  });

  test("Checks if ship can be realigned", () => {
    destroyer.realign();
    expect(destroyer.alignment).toBe("Vertical");
    destroyer.realign();
    expect(destroyer.alignment).toBe("Horizontal");
  });
});
