import { timingSafeEqual } from "crypto";
import * as fs from 'fs';
import RobotBoard from './RobotBoard';

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

  constructor() {
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
    if (!RobotBoard.isXAllowed(xPos)) {
      throw new Error(`Out of bound x position spoecified. ${xPos}`);
    }
    if (!RobotBoard.isYAllowed(yPos)) {
      throw new Error(`Out of bound y position spoecified. ${yPos}`);
    }
  
    this.xPos = xPos;
    this.yPos = yPos;
    this.direction = direction;
  }

  public move() {
    if (this.direction === DirectionTypes.EAST) {
      let x = this.xPos + 1;
      if (RobotBoard.isXAllowed(x)) {
        this.xPos = x;
      }
    } else if (this.direction === DirectionTypes.WEST) {
      let x = this.xPos - 1;
      if (RobotBoard.isXAllowed(x)) {
        this.xPos = x;
      }
    } else if (this.direction === DirectionTypes.NORTH) {
      let y = this.yPos - 1;
      if (RobotBoard.isYAllowed(y)) {
        this.yPos = y;
      }
    } else if (this.direction === DirectionTypes.SOUTH) {
      let y = this.yPos + 1;
      if (RobotBoard.isYAllowed(y)) {
        this.yPos = y;
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