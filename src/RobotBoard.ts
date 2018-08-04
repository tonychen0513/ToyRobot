class RobotBoard {
  private numRows: number;
  private numCols: number;

  constructor (numRows: number, numCols: number) {
    this.numCols = numCols;
    this.numRows = numRows;
  }

  public isXAllowed(xPos: number): boolean {
    if (xPos < 0 || xPos >= this.numCols) {
      return false;
    } else {
      return true;
    }
  }

  public isYAllowed(yPos: number): boolean {
    if (yPos < 0 || yPos >= this.numRows) {
      return false;
    } else {
      return true;
    }
  }
}

export default new RobotBoard(5, 5);