import Board from "./board";

const COLS = 16;
const ROWS = 16;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;

const board = new Board(CANVAS_WIDTH, CANVAS_HEIGHT, COLS, ROWS);
board.renderBoard();
