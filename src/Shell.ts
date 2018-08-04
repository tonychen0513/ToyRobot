#!/usr/bin/env node
import * as program from 'commander';
import * as readLine from 'readline-sync';
import {ToyRobot, StringToDirection, DirectionTypes } from './Robot';
import CommandExecutor from './CommandExecutor';
 
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
    let robot = new ToyRobot();
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
    let robot = new ToyRobot();
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
    let robot = new ToyRobot();
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
    let robot = new ToyRobot();
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
    let robot = new ToyRobot();
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

if (!program.args.length) {
  if (program.interactive) {
    // Enter the interactive mode
    console.info(
      'Enter the interactive mode! Please enter your instructions. Type "exit" to exit the command.'
    );

    let cmdExecutor: CommandExecutor = new CommandExecutor(new ToyRobot());

    for (;;) {
      const response = readLine.question('> ');

      if (response.toUpperCase() === 'EXIT') {
        console.info('Bye!');
        break;
      } else if (!cmdExecutor.execute(response)) {
        console.error('Unknown command or incorrect arguments provided');
      }
    }
  } else {
    // Print help if nothing is specified.
    program.outputHelp();
  }
}