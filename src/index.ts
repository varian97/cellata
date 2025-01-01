import Board from "./board";

const COLS = 32;
const ROWS = 32;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;

const board = new Board(CANVAS_WIDTH, CANVAS_HEIGHT, COLS, ROWS);
board.renderBoard();

const stepButton = document.getElementById(
  "step-button"
) as HTMLButtonElement | null;

const clearButton = document.getElementById(
  "clear-button"
) as HTMLButtonElement | null;

if (!stepButton) {
  throw new Error("Step button not found in HTML");
}

if (!clearButton) {
  throw new Error("Clear button not found in HTML");
}

stepButton.addEventListener("click", () => {
  board.step();
});

clearButton.addEventListener("click", () => {
  board.clear();
});
