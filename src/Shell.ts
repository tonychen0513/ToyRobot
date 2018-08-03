#!/usr/bin/env node
import * as program from 'commander';
import * as readLine from 'readline-sync';
import { ToyRobot, StringToDirection, DirectionTypes } from './Robot';

const errorHandle = (e: Error) => {
  console.error(e.message);
}
 
program
  .version('0.0.1')
  .description('Toy robot control system')
  .option('-i, --interactive', 'Enable interactive mode');

program
  .command('PLACE <x> <y> <f>')
  .description(
    'Place the toy robot at the position (x, y), facing the f direction specified as NORTH, EAST, WEST or SOUTH.'
  )
  .action((x: string, y: string, f: string) => {
    let robot = new ToyRobot(5, 5);
    let numX = +x;
    let numY = +y;
    let dir: DirectionTypes = StringToDirection(f);

    const retVal = robot.place(numX, numY, dir);
    try {
      robot.Save();
    }
    catch(e) {
      console.error(e);  
    }
  });

program
  .command('MOVE')
  .description(
    'Move the toy robot one unit forward in the direction it is currently facing.'
  )
  .action(() => {
    // TODO: Think about letting the Load become a factory function
    let robot = new ToyRobot(5, 5);
    try {
      robot.Load();
      robot.move();
      robot.Save();
    }
    catch(e) {
      console.error(e);
    }
  });

program
  .command('LEFT')
  .description(
    'Rotate the toy robot 90 degrees to the left direction without changing the position of the robot.'
  )
  .action(() => {
    // TODO: Think about letting the Load become a factory function
    let robot = new ToyRobot(5, 5);
    try {
      robot.Load();
      robot.turnLeft();
      robot.Save();
    }
    catch(e) {
      console.error(e);
    }
  });

program
  .command('RIGHT')
  .description(
    'Rotate the toy robot 90 degrees to the right direction without changing the position of the robot.'
  )
  .action(() => {
    // TODO: Think about letting the Load become a factory function
    let robot = new ToyRobot(5, 5);
    try {
      robot.Load();
      robot.turnRight();
      robot.Save();
    }
    catch(e) {
      console.error(e);
    }
  });

program
  .command('REPORT')
  .description('Report the x, y position and the direction of the toy robot.')
  .action(() => {
    // TODO: Think about letting the Load become a factory function
    let robot = new ToyRobot(5, 5);
    try {
      robot.Load();
      let retVal = robot.report();
      console.info(retVal);
    }
    catch(e) {
      console.error(e);
    }
  });

program.parse(process.argv);

export function executeCommand(cmdLine: string, robot: ToyRobot) {
  const args = cmdLine.split(' ');
  try {
    if (args.length > 1 && args[0].toUpperCase() === 'PLACE') {
      if (args.length === 4) {
        robot.place(+args[1], +args[2], StringToDirection(args[3]));
      } else {
        const secondArgs = args[1].split(',');
        if (secondArgs.length === 3) {
          robot.place(+secondArgs[0], +secondArgs[1], StringToDirection(secondArgs[2]));
        } else {
          return false;
        }
      }
    } else if (args.length > 0) {
      switch (args[0].toUpperCase()) {
        case 'MOVE':
          robot.move();
          break;
        case 'LEFT':
          robot.turnLeft();
          break;
        case 'RIGHT':
          robot.turnRight();
          break;
        case 'REPORT':
          let retVal = robot.report();
          console.info(retVal);
          break;
        default:
          return false;
      }
    }
  }
  catch(e) {
    console.error(e);
  }
  return true;
}

if (!program.args.length) {
  if (program.interactive) {
    // Enter the interactive mode
    console.info(
      'Enter the interactive mode! Please enter your instructions. Type "exit" to exit the command.'
    );

    let robot: ToyRobot = new ToyRobot(5, 5);

    for (;;) {
      const response = readLine.question('> ');

      if (response.toUpperCase() === 'EXIT') {
        console.info('Bye!');
        break;
      } else if (!executeCommand(response, robot)) {
        console.error('Unknown command or incorrect arguments provided');
      }
    }
  } else {
    // Print help if nothing is specified.
    program.outputHelp();
  }
}