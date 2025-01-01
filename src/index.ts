import Board from "./board";

const COLS = 32;
const ROWS = 32;
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class Engine {
  board: Board;
  playButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  stepButton: HTMLButtonElement;
  clearButton: HTMLButtonElement;
  state: "paused" | "playing";

  constructor() {
    this.board = new Board(CANVAS_WIDTH, CANVAS_HEIGHT, COLS, ROWS);

    const playButton = document.getElementById(
      "play-button"
    ) as HTMLButtonElement | null;

    const pauseButton = document.getElementById(
      "pause-button"
    ) as HTMLButtonElement | null;

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

    if (!playButton) {
      throw new Error("Play button not found in HTML");
    }

    if (!pauseButton) {
      throw new Error("Pause button not found in HTML");
    }

    this.stepButton = stepButton;
    this.clearButton = clearButton;
    this.playButton = playButton;
    this.pauseButton = pauseButton;

    this.state = "paused";
  }

  start() {
    this.stepButton.addEventListener("click", () => {
      this.board.step();
    });

    this.clearButton.addEventListener("click", () => {
      this.board.clear();
    });

    this.playButton.addEventListener("click", () => {
      this.handlePlay();
    });

    this.pauseButton.addEventListener("click", () => {
      this.handlePause();
    });

    this.board.initBoard();
    this.board.renderBoard();
  }

  async handlePlay() {
    this.state = "playing";
    this.playButton.disabled = true;
    this.stepButton.disabled = true;
    this.clearButton.disabled = true;

    while (this.state === "playing") {
      await sleep(500);
      this.board.step();
    }
  }

  handlePause() {
    this.state = "paused";
    this.playButton.disabled = false;
    this.stepButton.disabled = false;
    this.clearButton.disabled = false;
  }
}

const engine = new Engine();
engine.start();
