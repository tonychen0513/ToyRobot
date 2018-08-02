export enum DirectionTypes {
  NORTH,
  EAST,
  WEST,
  SOUTH
};

export class ToyRobot
{
  private xPos: number;
  private yPos: number;
  private maxXPos: number;
  private maxYPos: number;
  private direction: DirectionTypes;

  constructor(maxX: number, maxY: number )
  {
    this.maxXPos = maxX;
    this.maxYPos = maxY;
    this.xPos = 0;
    this.yPos = 0;
    this.direction = DirectionTypes.EAST;
  }

  public Load()
  {

  }

  public Save()
  {

  }

  public place(xPos: number, yPos: number, direction: DirectionTypes)
  {

  }

  public move()
  {

  }

  public turnLeft()
  {

  }

  public turnRight()
  {

  }

  public report() : string
  {
    return '';
  }
}