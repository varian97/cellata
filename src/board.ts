export default class Board {
  width: number;
  height: number;
  numCols: number;
  numRows: number;
  cellHeight: number;
  cellWidth: number;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  currBoard: Array<Array<number>>;
  nextBoard: Array<Array<number>>;

  constructor(width: number, height: number, numCols: number, numRows: number) {
    this.width = width;
    this.height = height;
    this.numCols = numCols;
    this.numRows = numRows;

    this.cellWidth = this.width / this.numCols;
    this.cellHeight = this.height / this.numRows;

    const canvas = document.getElementById("app") as HTMLCanvasElement | null;
    if (!canvas) {
      throw new Error("Canvas not found inside the HTML");
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas context is not able to initialize");
    }

    this.canvas = canvas;
    this.ctx = ctx;

    this.currBoard = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 0)
    );
    this.nextBoard = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => 0)
    );

    canvas.addEventListener("click", (e) => {
      const { offsetX, offsetY } = e;
      const x = Math.floor(offsetX / this.cellWidth);
      const y = Math.floor(offsetY / this.cellHeight);

      if (this.currBoard[y][x] === 0) {
        this.currBoard[y][x] = 1;
      } else {
        this.currBoard[y][x] = 0;
      }
      this.renderBoard();
    });
  }

  renderBoard() {
    this.ctx.fillStyle = "#181818";
    this.ctx.strokeStyle = "#a1a1a1";

    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        if (this.currBoard[y][x] === 1) {
          this.ctx.fillRect(
            x * this.cellWidth,
            y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
          );
        } else {
          this.ctx.clearRect(
            x * this.cellWidth,
            y * this.cellHeight,
            this.cellWidth,
            this.cellHeight
          );
        }
      }
    }

    for (let x = 0; x <= this.numCols; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x * this.cellWidth, 0);
      this.ctx.lineTo(x * this.cellWidth, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y <= this.numRows; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y * this.cellHeight);
      this.ctx.lineTo(this.width, y * this.cellHeight);
      this.ctx.stroke();
    }
  }

  step() {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        const alive = this._calculateAliveNeighbors(x, y);

        if (this.currBoard[y][x] === 0) {
          this.nextBoard[y][x] = alive === 3 ? 1 : 0;
        } else {
          this.nextBoard[y][x] = alive === 3 || alive === 2 ? 1 : 0;
        }
      }
    }

    [this.currBoard, this.nextBoard] = [this.nextBoard, this.currBoard];

    this.renderBoard();
  }

  clear() {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        this.currBoard[y][x] = 0;
        this.nextBoard[y][x] = 0;
      }
    }

    this.renderBoard();
  }

  _calculateAliveNeighbors(x: number, y: number): number {
    let count = 0;

    for (let dy = -1; dy < 2; dy++) {
      for (let dx = -1; dx < 2; dx++) {
        const currX = x + dx;
        const currY = y + dy;

        if (
          currX < 0 ||
          currY < 0 ||
          currX > this.numCols - 1 ||
          currY > this.numRows - 1 ||
          (currX === x && currY === y)
        ) {
          continue;
        }

        if (this.currBoard[currY][currX] === 1) {
          count += 1;
        }
      }
    }

    return count;
  }
}
