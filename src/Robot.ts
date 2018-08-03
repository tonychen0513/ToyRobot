import { timingSafeEqual } from "crypto";
import * as fs from 'fs';

export enum DirectionTypes {
  NORTH,
  EAST,
  WEST,
  SOUTH
};

export const StringToDirection = (strDirection: string) : DirectionTypes => {
  var nonCaseDir = strDirection.toUpperCase();
  if (nonCaseDir === 'EAST')
    return DirectionTypes.EAST;
  else if (nonCaseDir === 'WEST')
    return DirectionTypes.WEST;
  else if (nonCaseDir === 'NORTH')
    return DirectionTypes.NORTH;
  else if (nonCaseDir === 'SOUTH')
    return DirectionTypes.SOUTH;
  else
    throw new Error('Invalid direction.');
};

export const DirectionToString = (dir: DirectionTypes) : string => {
  if (dir === DirectionTypes.EAST)
    return 'EAST';
  else if (dir === DirectionTypes.WEST)
    return 'WEST';
  else if (dir === DirectionTypes.SOUTH)
    return 'SOUTH';
  else
    return 'NORTH';
}

export class ToyRobot
{
  private xPos: number;
  private yPos: number;
  private maxXPos: number;
  private maxYPos: number;
  private direction: DirectionTypes;

  private readonly LEFT_TURN = new Map<number, DirectionTypes>([
    [DirectionTypes.EAST, DirectionTypes.NORTH],
    [DirectionTypes.NORTH, DirectionTypes.WEST],
    [DirectionTypes.WEST, DirectionTypes.SOUTH],
    [DirectionTypes.SOUTH, DirectionTypes.EAST]
  ]);
  
  private readonly RIGHT_TURN = new Map<number, DirectionTypes>([
    [DirectionTypes.EAST, DirectionTypes.SOUTH],
    [DirectionTypes.SOUTH, DirectionTypes.WEST],
    [DirectionTypes.WEST, DirectionTypes.NORTH],
    [DirectionTypes.NORTH, DirectionTypes.EAST]
  ]);

  constructor(maxX: number, maxY: number ) {
    this.maxXPos = maxX;
    this.maxYPos = maxY;
    this.xPos = 0;
    this.yPos = 0;
    this.direction = DirectionTypes.EAST;
  }

  private readonly toyRobotFile = 'toyRobotData.json';

  public Load() {
    let jsonObj = JSON.parse(fs.readFileSync(this.toyRobotFile, 'utf8'));
    this.xPos = jsonObj.xPos;
    this.yPos = jsonObj.yPos;
    this.direction = StringToDirection(jsonObj.strDir);
  }

  public Save() {
    let jsonObj = {
      xPos: this.xPos,
      yPos: this.yPos,
      strDir: DirectionToString(this.direction)
    };
    const s = JSON.stringify(jsonObj);
    fs.writeFileSync(this.toyRobotFile, s);
  }

  public place(xPos: number, yPos: number, direction: DirectionTypes) {
    let errorMsg = '';
    if (xPos < 0 || xPos >= this.maxXPos) {
      throw new Error(`Out of bound x position spoecified. ${xPos}`);
    }
    if (yPos < 0 || yPos >= this.maxYPos) {
      throw new Error(`Out of bound y position spoecified. ${yPos}`);
    }
  
    this.xPos = xPos;
    this.yPos = yPos;
    this.direction = direction;
  }

  public move() {
    if (this.direction === DirectionTypes.EAST) {
      if (this.xPos < this.maxXPos - 1) {
        this.xPos++;
      }
    } else if (this.direction === DirectionTypes.WEST) {
      if (this.xPos > 0) {
        this.xPos--;
      }
    } else if (this.direction === DirectionTypes.NORTH) {
      if (this.yPos < this.maxYPos - 1) {
        this.yPos++;
      }
    } else if (this.direction === DirectionTypes.SOUTH) {
      if (this.yPos > 0) {
        this.yPos--;
      }
    }
  }

  public turnLeft()
  {
    this.direction = this.LEFT_TURN.get(this.direction)!;
  }

  public turnRight()
  {
    this.direction = this.RIGHT_TURN.get(this.direction)!;
  }

  public report() : string
  {
    var strDir = '';
    if (this.direction === DirectionTypes.EAST)
      strDir = 'EAST';
    else if (this.direction === DirectionTypes.WEST)
      strDir = 'WEST';
    else if (this.direction === DirectionTypes.NORTH)
      strDir = 'NORTH';
    else if (this.direction === DirectionTypes.SOUTH)
      strDir = 'SOUTH';

    return `${this.xPos},${this.yPos},${strDir}`;
  }
}