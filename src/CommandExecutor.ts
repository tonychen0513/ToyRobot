import {ToyRobot, StringToDirection } from './Robot';

class InteractiveCommandExecutor {
  theRobot: ToyRobot;

  constructor(robot: ToyRobot) {
    this.theRobot = robot;
  }

  public execute(cmdLine: string) : boolean {
    const args = cmdLine.split(' ');
    try {
      if (args.length > 1 && args[0].toUpperCase() === 'PLACE') {
        if (args.length === 4) {
          this.theRobot.place(+args[1], +args[2], StringToDirection(args[3]));
        } else {
          const secondArgs = args[1].split(',');
          if (secondArgs.length === 3) {
            this.theRobot.place(+secondArgs[0], +secondArgs[1], StringToDirection(secondArgs[2]));
          } else {
            return false;
          }
        }
      } else if (args.length > 0) {
        switch (args[0].toUpperCase()) {
          case 'MOVE':
            this.theRobot.move();
            break;
          case 'LEFT':
            this.theRobot.turnLeft();
            break;
          case 'RIGHT':
            this.theRobot.turnRight();
            break;
          case 'REPORT':
            let retVal = this.theRobot.report();
            console.info(retVal);
            break;
          default:
            return false;
        }
      }
    }
    catch(e) {
      console.error(e);
      return false;
    }
    return true;
  }
}


export default InteractiveCommandExecutor;